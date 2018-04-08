curbg = 0;
kills1 = false;
kills2 = false;
var a = function(sketch) {
  points = []
  sketch.setup = function() {
    cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(9, 102, 175);
    for(i = 0; i < 50; i++){
      points.push({
        x: Math.random() * sketch.windowWidth,
        y: Math.random() * sketch.windowHeight,
        col: 0,
        size: Math.random() * 10 + 5,
        velx: Math.random() * 10 - 5,
        vely: Math.random() * 10 - 5
      })
    }
  };
  sketch.draw = function(){
    if(kills1){
      sketch.exit();
    }
    sketch.background(9, 102, 175);
    for(i = 0; i < points.length; i++){
      cur = points[i]
      cur.col == 1 ? sketch.stroke(0, 0, 0) : sketch.stroke(220, 220, 220);
      sketch.strokeWeight(cur.size)
      sketch.point(cur.x, cur.y)
      sketch.fill(0, 0, 0, 0)
      sketch.stroke(0, 0, 0, 50)
      sketch.strokeWeight(1)
      sketch.ellipse(cur.x, cur.y, cur.size*10)
      for(j = i + 1; j < points.length; j++){
        other = points[j]
        if( (Math.pow(other.x - cur.x, 2) +
            Math.pow(other. y - cur.y, 2))
            < Math.pow(other.size*5 + cur.size*5 ,2)){
              sketch.stroke(220, 220, 220)
              sketch.strokeWeight(2);
              sketch.line(cur.x, cur.y, other.x, other.y)
            }
      }
      cur.x += cur.velx
      cur.y += cur.vely
      cur.vely += Math.random() - 0.5
      cur.velx += Math.random() - 0.5
      if(cur.velx > 5) cur.velx = 5;
      if(cur.velx < -5) cur.velx = -5;
      if(cur.vely > 5) cur.velx = 5;
      if(cur.velx < -5) cur.velx = -5;
      if(cur.x > sketch.windowWidth + cur.size*10){
        cur.x = 0
      }
      if(cur.x < 0 - cur.size*10){
        cur.x = sketch.windowWidth
      }
      if(cur.y > sketch.windowHeight + cur.size*10){
        cur.y = 0
      }
      if(cur.y < 0 - cur.size*10){
        cur.y = sketch.windowHeight
      }

    }
  }

}
var b = function(sketch) {
  mypoints = []
  sketch.setup = function() {
    cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(9, 102, 175);
    for(i = 0; i < 50; i++){
      mypoints.push({
        x: Math.random() * sketch.windowWidth,
        y: Math.random() * sketch.windowHeight,
        xvel: Math.random()*2 - 1,
        yvel: Math.random()*2 - 1
      })
    }
  };
  sketch.draw = function(){
    //if(curbg != 1) return;
    setGradient(0, 0, sketch.windowWidth, sketch.windowHeight, sketch.color(9, 102, 175), sketch.color(73, 167, 240));
    for(i = 0; i < mypoints.length; i++){
      if(kills2){
        sketch.exit();
      }
      cur = mypoints[i];
      sketch.stroke(255, 255, 255)
      sketch.strokeWeight(cur.y / 50)
      sketch.point(cur.x, cur.y)

      cur.x += cur.xvel;
      cur.y += cur.yvel;

      if(cur.x > sketch.windowWidt + 50){
        cur.x = 0
      }
      if(cur.x < -50){
        cur.x = sketch.windowWidth
      }
      if(cur.y > sketch.windowHeight + 50){
        cur.y = 0
      }
      if(cur.y < -50){
        cur.y = sketch.windowHeight
      }


    }
  }
  function setGradient(x, y, w, h, c1, c2, axis) {

  sketch.noFill();
    for (var i = y; i <= y+h; i++) {
      var inter = sketch.map(i, y, y+h, 0, 1);
      var c = sketch.lerpColor(c1, c2, inter);
      sketch.stroke(c);
      sketch.line(x, i, x+w, i);
    }
}
};
var c = function(sketch) {
  it = 0;
  sketch.setup = function() {
    cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    setGradient(0, 0, sketch.windowWidth, sketch.windowHeight, sketch.color(73, 167, 240), sketch.color(9, 102, 175));
    it = 0;
  };
  sketch.draw = function(){
    setGradient(0, 0, sketch.windowWidth, sketch.windowHeight, sketch.color(73, 167, 240), sketch.color(9, 102, 175));
    sketch.fill(240, 240, 240, 50)
    it += 0.1
    sketch.ellipse(sketch.windowWidth/2, sketch.windowHeight/2, 400 + getOffset(it), 400 + getOffset(it))
    sketch.ellipse(sketch.windowWidth/2, sketch.windowHeight/2, 300 + getOffset(it + 0.5), 300 + getOffset(it + 0.5))
    sketch.ellipse(sketch.windowWidth/2, sketch.windowHeight/2, 200 + getOffset(it + 1), 200 + getOffset(it + 1))
    sketch.ellipse(sketch.windowWidth/2, sketch.windowHeight/2, 100 + getOffset(it + 1.5), 100 + + getOffset(it + 1.5))
  }
  getOffset = function(num){
    return Math.sin(num)*50
  }
  function setGradient(x, y, w, h, c1, c2, axis) {

  sketch.noFill();
    for (var i = y; i <= y+h; i++) {
      var inter = sketch.map(i, y, y+h, 0, 1);
      var c = sketch.lerpColor(c1, c2, inter);
      sketch.stroke(c);
      sketch.line(x, i, x+w, i);
    }
}
};
$(document).ready(function(){
new p5(a, 'bgSketch1');
new p5(b, 'bgSketch2');
new p5(c, 'bgSketch3');
});
