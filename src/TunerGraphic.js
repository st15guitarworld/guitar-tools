import Konva from 'konva';

let xPositionOnCircle = (r,angle,ox)=> {
  return ox + r * Math.cos(angle);
}

let yPositionOnCircle = (r,angle,oy)=> {
  return oy + r * Math.sin(angle);
}

let arcLength = (radius,degrees)=> {
  return 2 * Math.PI * radius * (degrees/360);
}

let toRadians = (angle) => {
return angle * (Math.PI / 180);
}

export default function TunerGraphic(container){
  let hand = null;
  let noteText = null;
  let layer = null;
  let stage = new Konva.Stage({
     container:container,
     width:500,
     height:500
   });

  let output = {};

  output.draw = ()=>{
      let innerRadius = stage.getWidth() * 0.50;
      let x = stage.getWidth() / 2;
      let y = stage.getHeight() * 0.7;
      layer = new Konva.Layer();
      // create our shape
      let leftArc = new Konva.Arc({
        x: x,
        y: y,
        angle:350,
        clockwise:true,
        innerRadius:innerRadius,
        outerRadius:innerRadius,
        stroke: 'black',
        strokeWidth: 3,
        rotation: -118
      });
      drawTopArc(innerRadius,x,y,50,-112.75,layer);

      let rightArc = new Konva.Arc({
        x: x,
        y: y,
        angle:350,
        clockwise:true,
        innerRadius:innerRadius,
        outerRadius:innerRadius,
        stroke: 'black',
        strokeWidth: 3,
        rotation: -52
      });

       hand = new Konva.Line({
        points: [x, y - 80,x,y-innerRadius + 15],
        stroke: 'black',
        strokeWidth: 3
      });

       noteText = new Konva.Text({
        x: 15,
        y: 15,
        text: 'NA',
        fontSize: 50,
        fontFamily: 'digital',
        fill: 'black',
        id:'theNote'
      });

      let rightCentText = new Konva.Text({
        x:xPositionOnCircle(innerRadius,toRadians(288),x),
        y:yPositionOnCircle(innerRadius,toRadians(288),y + 17),
        text:'+10',
        fill: 'black',
        fontSize: 20
      });

      let leftCentText = new Konva.Text({
        x:xPositionOnCircle(innerRadius,toRadians(240),x),
        y:yPositionOnCircle(innerRadius,toRadians(240),y),
        text:'-10',
        fill: 'black',
        fontSize: 20
      });

      let wedge = new Konva.Wedge({
      x: x,
      y: y - innerRadius + 1,
      radius: 5,
      angle: 60,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4,
      rotation: -120
    });

      // add the shapes to the layer
      layer.add(leftArc);
      //layer.add(topArc);
      layer.add(rightArc);
      layer.add(hand);
      layer.add(leftCentText);
      layer.add(rightCentText);
      layer.add(noteText);
      layer.add(wedge);
      // add the layer to the stage
      stage.add(layer);
 }

let drawTopArc = (r,cx,cy, rangeAngle,startAngle,layer) => {
let angleChunks = rangeAngle / 11;
  for (var i = 0; i < 11 ; i++) {
    let startAngleOfChunkInRadians = toRadians(startAngle + angleChunks*i);
      layer.add(drawBlackCircle(2,xPositionOnCircle(r,startAngleOfChunkInRadians,cx),
                  yPositionOnCircle(r,startAngleOfChunkInRadians,cy)));
  }
}

let drawBlackCircle = (r,x,y)=> {
  return new Konva.Circle({
    radius:r,
    x:x,
    y:y,
    fill:'black',
    stroke:'black',
    strokeWidth:'1'
  });
}
output.onUpdate = (frequency,two,note,centsOffFromPitch) => {
  noteText.text(note);
  //hand.rotate(1);
  layer.batchDraw();
}
  return output;
}
