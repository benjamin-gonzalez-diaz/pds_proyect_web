import os
from dis import Instruction
from flask import Flask, render_template, request, url_for, redirect, jsonify, flash
from flask_sqlalchemy import SQLAlchemy
import json
import requests
from datetime import datetime, timezone
from werkzeug.utils import secure_filename
import debugpy

UPLOAD_FOLDER = './upload'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///tasks.db"
db = SQLAlchemy(app)


class todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(50))
    enunciado = db.Column(db.String(500))

    #Información del DCL (formato JSON)
    data = db.Column(db.JSON)
    #informacion de la foto
    image_name = db.Column(db.Text)   
    #nivel del ejercicio
    date_created = db.Column(db.DateTime)
    
    
tasks = {}
@app.route('/Board', methods=['POST', 'GET'])
def board():  
    if request.method == 'POST':

        task_title = request.form['title']
        task_instructions = request.form['instructions']
        #JSON information
        task_data = request.form['data']
        file = request.form['file'].split("\\")[-1]
        image_name = os.path.join(app.config['UPLOAD_FOLDER'], file)
        
        task = todo( title=task_title, enunciado = task_instructions, data = task_data, image_name = image_name, date_created=datetime.utcnow())
        try:
            db.session.add(task)
            db.session.commit()
            return redirect('/') 
        except:
            return "Hubo un error subiendo tu información"
    else: 
        return render_template('board.html')

@app.route('/uploadImage', methods=['POST', 'GET'])
def upload_File():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    return render_template('board.html')
    
@app.route('/User/<int:id>', methods=['POST', 'GET'])
def user():
    return False

@app.route('/Delete/<int:id>', methods=['POST', 'GET'])
def delete(id):  
    task_to_delete = todo.query.get_or_404(id)
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        print("Hubo un error borrando la tarea")


@app.route('/VerTareas/<int:id>', methods=['POST', 'GET'])
def ver(id):  
    task = todo.query.get_or_404(id)
    return render_template('VerTareas.html', task=task)



@app.route('/Update/<int:id>', methods=['POST', 'GET'])
def update(id):  
    task = todo.query.get_or_404(id)
    if request.method == 'POST':
        task.title = request.form['title']
        task.enunciado = request.form['instructions']

        #JSON information
        task.data = request.form['data']
        task.image_name = request.form['imagenDCL']
        try:
            db.session.commit()
            return redirect('/')
        except:
            print( "Hubo un error actualizando tu información")
            return "Hubo un error subiendo tu información"
    else: 
        return render_template('Update.html', task=task)



@app.route('/')
def home():
    tasks = todo.query.order_by(todo.id).all()
    return render_template('Tareas.html', tasks=tasks)


    
if __name__ == '__main__':
    app.run(debug=True, port=5000)
    #debugpy.listen('127.0.0.1', 3008)
