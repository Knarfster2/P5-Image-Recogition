// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4
//https://blog.bitsrc.io/4-ways-to-communicate-across-browser-tabs-in-realtime-e4f5f6cbedca


let font;
let vehicles = [];
let value = 0;
let changeLetterOn = 4;
let video;
let detector;
let detections = [];
let label = '';
let sc;
let apple = [];
let phone = [];
let cup = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.ttf');

}


function setup() {
  createCanvas(1000, 400);
  background(51);
  
   //find points along text
  var points = font.textToPoints('APPLE', 100, 300, 250, {
    sampleFactor: 0.25
  });
  //create array to store points so we can send ellipses to them 
  for (var i = 0; i < points.length; i = i + 4) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  
  arrayCopy(vehicles,apple);
  
  // console.log(apple);  
  
    //find points along text
  var points = font.textToPoints('PHONE', 100, 300, 250, {
    sampleFactor: 0.25
  });
  //create array to store points so we can send ellipses to them 
  for (var i = 0; i < points.length; i = i + 4) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    phone.push(vehicle);
  }
  //find points along text
  var points = font.textToPoints('CUP', 100, 300, 250, {
    sampleFactor: 0.05
  });
  //create array to store points so we can send ellipses to them 
  for (var i = 0; i < points.length; i = i + 4) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    cup.push(vehicle);
  }
  
  
  window.addEventListener('storage', (event) => {
    if (event.storageArea != localStorage) return;
    if (event.key === 'apple') {
      console.log(JSON.parse(window.localStorage.getItem('apple')));
      if (JSON.parse(window.localStorage.getItem('apple')) == 1) {
        value = 1;
        arrayCopy(apple,vehicles);
      } else if (JSON.parse(window.localStorage.getItem('apple')) == 2){
        value = 2;
        arrayCopy(phone,vehicles);
      } else if (JSON.parse(window.localStorage.getItem('apple')) == 3){
        value = 3;
        arrayCopy(cup,vehicles);
      }else {
        value = 0;
      }
    };

  });

 
  
}


function detectObject() {
  window.addEventListener('storage', (event) => {
    if (event.storageArea != localStorage) return;
    if (event.key === 'loggedIn') {
      // Do something with event.newValue
    }
  });
}

function draw() {
  background(51);
  // sc.background(51);
  // detectObject();
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors(value);
    v.update();
    v.show();
  }



  // function keyTyped() {
  //   if (key === 'a') {
  //     value = 0;
  //   } 
  // }
}