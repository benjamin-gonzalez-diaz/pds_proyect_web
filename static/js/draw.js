var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var poin = 0;
var points = []

const stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
});

let layer = new Konva.Layer();


var gridLayer = new Konva.Layer();
var padding = blockSnapSize;
console.log(width, padding, width / padding);
for (var i = 0; i < width / padding; i++) {
gridLayer.add(new Konva.Line({
    points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
    stroke: '#ddd',
    strokeWidth: 1,
}));
}

gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
for (var j = 0; j < height / padding; j++) {
    gridLayer.add(new Konva.Line({
        points: [0, Math.round(j * padding), width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
    }));
}


stage.add(gridLayer);
stage.add(layer);
gridLayer.draw()

class arrow{
  constructor(layer, stage, color, xi=50, yi=50, xf=250, yf=50) {
    layer = layer;
    stage = stage;
    xi=xi
    xf=xf
    yi=yi
    yf=yf

  const line = new Konva.Arrow({
    points: [xi, yi, xf, yf],
    fill: color,
    stroke: color ,
    strokeWidth: 4,
    name:"arrow"
    });
  layer.add(line);

 

  const anchor1 = new Konva.Circle({
    x: line.attrs.points[0],
    y: line.attrs.points[1],
    points:[line.attrs.points[0], line.attrs.points[1]],
    radius: 5,
    fill: 'red',
    draggable: true,
    name:"circle"
  })
  layer.add(anchor1);
  poin += 1
  points.push(poin)
  const textoCircle1 = new Konva.Text({
    text:  "P"+poin,
    x: line.attrs.points[2],
    y: line.attrs.points[3]-30,
    name:"point",
    fill: 'darkgreen',
    fontSize: 15
  })
  layer.add(textoCircle1)
  const anchor2 = new Konva.Circle({
    x: line.attrs.points[2],
    y: line.attrs.points[3],
    points:[line.attrs.points[2], line.attrs.points[3]],
    radius: 5,
    fill: 'red',
    draggable: true,
    name:"circle"
  })
  layer.add(anchor2);

  const texto = new Konva.Text({
    text:  "Fuerza",
    x: anchor1.x()+(anchor2.x() - anchor1.x())/2,
    y: anchor1.y() + (anchor2.y() - anchor1.y())/2,
    name:"text",
    fill: 'black',
    fontSize: 20
  })
  layer.add(texto)

  
  function updateLine() {
    const points = [
      anchor1.x(),
      anchor1.y(),
      anchor2.x(),
      anchor2.y(),
      texto.text()
    ]
    line.points(points);
    layer.batchDraw();
  }
  anchor1.on('dragend', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor1.y() / blockSnapSize) * blockSnapSize
    });
    texto.position({
      x: anchor1.x()+(anchor2.x() - anchor1.x())/2,
      y: anchor1.y() + (anchor2.y() - anchor1.y())/2
    });

    
    stage.batchDraw();
    
  });
  anchor2.on('dragend', (e) => {
    anchor2.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize
    });
    texto.position({
      x: anchor1.x()+(anchor2.x() - anchor1.x())/2,
      y: anchor1.y() + (anchor2.y() - anchor1.y())/2,
     
    });
    textoCircle1.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize +5
    })
    
    stage.batchDraw(); 
  });

  anchor2.on('dragmove', (e) => {
    anchor2.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize
    });
    textoCircle1.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize +5
    })
    stage.batchDraw();
  });

  anchor1.on('dragmove', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor1.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
  });

  anchor1.on('dragmove', updateLine);
  anchor2.on('dragmove', updateLine);
  console.log(points)
  console.log(layer.toJSON())
  
}}

class newline{
  constructor(layer, stage, xi=50, xf=250, yi=50, yf=50) {
    layer = layer;
    stage = stage;
    xi=xi
    xf=xf
    yi=yi
    yf=yf

  const line = new Konva.Line({
      points: [xi, yi, xf, yf],
      stroke: 'black',
      name:"line"

    });
  layer.add(line);

  const anchor1 = new Konva.Circle({
    x: line.attrs.points[0],
    y: line.attrs.points[1],
    points:[line.attrs.points[0], line.attrs.points[1]],
    radius: 5,
    fill: 'red',
    draggable: true,
    name:"circle"
  })
  layer.add(anchor1);
  poin += 1
  points.push(poin)
  const textoCircle1 = new Konva.Text({
    text:  "P"+poin,
    x: line.attrs.points[0],
    y: line.attrs.points[1]-30,
    name:"point",
    fill: 'darkgreen',
    fontSize: 15
  })
  layer.add(textoCircle1)

  const anchor2 = new Konva.Circle({
    x: line.attrs.points[2],
    y: line.attrs.points[3],
    points: [line.attrs.points[2], line.attrs.points[3]],
    radius: 5,
    fill: 'red',
    draggable: true,
    name:"circle",
  })
  layer.add(anchor2);
  poin += 1
  points.push(poin)
  const textoCircle2 = new Konva.Text({
    text:  "P"+poin,
    x: line.attrs.points[2],
    y: line.attrs.points[3]-30,
    name:"point",
    fill: 'darkgreen',
    fontSize: 15
  })
  if(poin !== 2){
    layer.add(textoCircle2)
  }

  const texto = new Konva.Text({
    text:  (Math.sqrt((anchor1.x()-anchor2.x())**2 + (anchor1.y()-anchor2.y()))/10).toFixed(0) + " M",
    x: anchor1.x()+(anchor2.x() - anchor1.x())/2,
    y: anchor1.y() + (anchor2.y() - anchor1.y())/2,
    name:"text",
    fill: 'black',
    fontSize: 20
  })
  layer.add(texto)

  function updateLine() {
    const points = [
      anchor1.x(),
      anchor1.y(),
      anchor2.x(),
      anchor2.y(),
      texto.text()
      
    ]
    const value = [
      texto.x(),
      texto.y()
    ]
    line.points(points);
    layer.batchDraw();
  }
  // 
 
  anchor1.on('dragend', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor1.y() / blockSnapSize) * blockSnapSize
    });
    texto.position({
      x: anchor1.x()+(anchor2.x() - anchor1.x())/2,
      y: anchor1.y() + (anchor2.y() - anchor1.y())/2
    });
    textoCircle1.position({
      x: Math.round(anchor1.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor1.y() / blockSnapSize) * blockSnapSize +5
    })
    texto.text(  (Math.sqrt((anchor1.x()-anchor2.x())**2 + (anchor1.y()-anchor2.y()))/10).toFixed(0) + " M");
    stage.batchDraw();
    
  });
  anchor2.on('dragend', (e) => {
    anchor2.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize
    });
    texto.position({
      x: anchor1.x()+(anchor2.x() - anchor1.x())/2,
      y: anchor1.y() + (anchor2.y() - anchor1.y())/2,
     
    });
    textoCircle2.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize +5
    })
    texto.text(  (Math.sqrt((anchor1.x()-anchor2.x())**2 + (anchor1.y()-anchor2.y()))/10).toFixed(0) + " M");
    stage.batchDraw(); 
  });
  
  texto.on('dragmove', (e) => {
    texto.text({
      text: (Math.sqrt((anchor1.x()-anchor2.x())**2 + (anchor1.y()-anchor2.y()))/10).toFixed(0)
    });
    stage.batchDraw();
  });

  anchor2.on('dragmove', (e) => {
    anchor2.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize
    });
    textoCircle2.position({
      x: Math.round(anchor2.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor2.y() / blockSnapSize) * blockSnapSize +5
    })
    stage.batchDraw();
  });

  anchor1.on('dragmove', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor1.y() / blockSnapSize) * blockSnapSize
    });
    textoCircle1.position({
      x: Math.round(anchor1.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(anchor1.y() / blockSnapSize) * blockSnapSize +5
    })
    stage.batchDraw();
  });
  
  anchor1.on('dragmove', updateLine);
  anchor2.on('dragmove', updateLine);
  texto.on('dragmove', updateLine);
  //texto.setAttr('x',line.attrs.points[0] + (line.attrs.points[2] - line.attrs.points[0])/2);
  //texto.setAttr('y',line.attrs.points[1] + (line.attrs.points[3] - line.attrs.points[1])/2);
  //texto.setAttr('text',"hola 3");
  //texto.setAttr('text', (Math.sqrt((line.attrs.points[0] - line.attrs.points[2])**2 + (line.attrs.points[1]-line.attrs.points[3]))/10 +"M"));
  //texto.setAttr('text', (Math.sqrt((anchor1.x()-anchor2.x())**2 + (anchor1.y()-anchor2.y()))/10).toFixed(0));
  texto.moveToTop();
  anchor1.setAttr( 'x', line.attrs.points[0]);
  anchor1.setAttr( 'y', line.attrs.points[1]);
  anchor2.setAttr( 'x', line.attrs.points[2]);
  anchor2.setAttr( 'y', line.attrs.points[3]);



  
}}

class empotra{
  constructor(layer, stage, color, xi = 60,yi = 60) {
    layer = layer;
    stage = stage;

  const anchor1 = new Konva.RegularPolygon({
    sides: 4,
    x:xi,
    y:yi,
    points:[xi, yi],
    width: 30,
    height: 20,
    fill: "black",
    draggable: true,
    name:"empotra",
  })
  layer.add(anchor1);
  poin += 1
  points.push(poin)
  const textoCircle1 = new Konva.Text({
    text:  "P"+poin,
    x: xi,
    y: yi-30,
    name:"point",
    fill: 'darkgreen',
    fontSize: 15
  })
  layer.add(textoCircle1)
  function updateLine() {
    anchor1.attrs.points = [
      anchor1.x(),
      anchor1.y(),
     
    ]
    layer.batchDraw();
  }

  anchor1.on('dragend', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x() ),
      y: Math.round(anchor1.y() ) 
    });
    textoCircle1.position({
      x: Math.round(anchor1.x() ),
      y: Math.round(anchor1.y() ) +5
    })
    stage.batchDraw();
    
  });
  anchor1.on('dragend', updateLine);
}}
 
  
class triangule{
  constructor(layer, stage, color,  xi=60, yi=60) {
    layer = layer;
    stage = stage;
    color = color 
   
  const anchor1 = new Konva.RegularPolygon({
    sides: 3,
    x:xi,
    y:yi,
    points:[xi, yi],
    width: 30,
    height: 20,
    fill: color,
    draggable: true,
    name:"triangule",
  })
  layer.add(anchor1);
  poin += 1
  points.push(poin)
  const textoCircle1 = new Konva.Text({
    text:  "P"+poin,
    x: xi,
    y: yi-30,
    name:"point",
    fill: 'darkgreen',
    fontSize: 15
  })
  layer.add(textoCircle1);
  function updateLine() {
    anchor1.attrs.points = [
      anchor1.x(),
      anchor1.y(),
     
    ]
    layer.batchDraw();
  }

  anchor1.on('dragend', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x() ),
      y: Math.round(anchor1.y() ) 
    });
    textoCircle1.position({
      x: Math.round(anchor1.x() ),
      y: Math.round(anchor1.y() ) +5
    })
    stage.batchDraw();
    
  });
  anchor1.on('dragend', updateLine);
}}
  
  
  
class circule{
  constructor(layer, stage,color, xi=50, yi=20) {
    layer = layer;
    stage = stage;
    xi = xi
    yi = yi

  const anchor1 = new Konva.Circle({
    x: xi,
    y: yi,
    points:[xi, yi],
    radius: 5,
    fill: 'blue',
    draggable: true,
    name:"circule",
  })
  layer.add(anchor1);
  poin += 1
  points.push(poin)
  const textoCircle1 = new Konva.Text({
    text:  "P"+poin,
    x: xi,
    y: yi-30,
    name:"point",
    fill: 'darkgreen',
    fontSize: 15
  })
  layer.add(textoCircle1)
  function updateLine() {
    anchor1.attrs.points = [
      anchor1.x(),
      anchor1.y(),
     
    ]
    layer.batchDraw();
  }

  anchor1.on('dragend', (e) => {
    anchor1.position({
      x: Math.round(anchor1.x()),
      y: Math.round(anchor1.y()) ,
    });
    textoCircle1.position({
      x: Math.round(anchor1.x()),
      y: Math.round(anchor1.y()) +5 ,
    })
    stage.batchDraw();
    updateLine()
  });
  

}
}
  

class newbiela{
  constructor(layer, stage, color, xi=50, yi=20) {
    layer = layer;
    stage = stage;
    xi=xi; yi=yi
    
    const anchor1 = new Konva.Circle({
      x: xi,
      y: yi,
      points:[xi, yi],
      radius: 5,
      fill: 'yellow',
      draggable: true,
      name:"biela",
    })
    layer.add(anchor1);
  
    function updateLine() {
      anchor1.attrs.points = [
        anchor1.x(),
        anchor1.y(),
       
      ]
      layer.batchDraw();
    }
  
    anchor1.on('dragend', (e) => {
      anchor1.position({
        x: Math.round(anchor1.x()),
        y: Math.round(anchor1.y()) 
      });
      stage.batchDraw();
      
    });
    anchor1.on('dragend', updateLine);

  }
}

  
layer.draw()

  