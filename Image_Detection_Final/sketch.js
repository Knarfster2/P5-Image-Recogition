// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;
let video;
let detector;
let detections = [];

function preload() {
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector('cocossd');
  window.localStorage.setItem("apple", "none");
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  for (let i = 0; i < detections.length; i++) {
    if (detections[i].label == 'apple') {
      console.log(detections[i].label);
      window.localStorage.setItem("apple", 1);
      break;
    }
    // if (i == (detections.length - 1)) {
    //   console.log(detections[i].label);
    //   window.localStorage.setItem("apple", 0);
    // }
    else if (detections[i].label == 'cell phone') {
      console.log(detections[i].label);
      window.localStorage.setItem("apple", 2);
      break;
    }
    if (i == (detections.length - 1)) {
      window.localStorage.setItem("apple", 0);
    }
  }
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);
  
}


function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}