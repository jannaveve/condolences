// The RiTa lib is included in index.html
// The text files are files in the project
var bg = [];
let avgRed = 0;
let avgGreen = 0;
let avgBlue = 0;
let cg;
let lines, markov, txt1, txt2;
let x = 400,
    y = 100;
let myFont;
const model = new rw.HostedModel({
  url:
    "https://continue-samplerexperiment-ee1dc17a.hosted-models.runwayml.cloud/v1/",
  token: "4FkmPeeLT4cKGY4wYXMlnw==",
});

function preload() {
  myFont = loadFont("data1/Goodbyecrewelworldnf-mLVeP.otf");
  txt1 = loadStrings("data1/Mitch.txt");
  txt2 = loadStrings("data1/condolences.txt");
  for (var i = 0; i < 25; i++) {
    bg[i] = loadImage("img/img" + i + ".png");
  }
}

function setup() {
  let c = createCanvas(1152, 768);
  cg = createGraphics(1152, 768);

  textFont(myFont, 24);
  textLeading(36);
  textAlign(LEFT);

  lines = ["Click for Condolence"];


  markov = RiTa.markov(3);

  // load text into the model
  markov.addText(txt1.join(" "));
  markov.addText(txt2.join(" "));

  drawText();
}

function drawText() {
  background(255);
  var r = floor(random(bg.length));
  
  noStroke();
  tint(255, 255);
  image(bg[r], 0, 0, 768, 768);
    // Load the pixels
  bg[r].loadPixels();

  // Loop through the pixels X and Y
  for (let y = 0; y < bg[r].height; y++) {
    for (let x = 0; x < bg[r].width; x++) {

      // Calculate the pixel index
      const index = (y * bg[r].width + x) * 4;

      // Sum the red, green, and blue values
      avgRed += bg[r].pixels[index + 0];
      avgGreen += bg[r].pixels[index + 1];
      avgBlue += bg[r].pixels[index + 2];

    }
  }

  // We're finished working with pixels so update them
  bg[r].updatePixels();

  // Get the total number of pixels
  // Divide by 4 because the total number of pixels = pixels * numColorChannels 
  const numPixels = bg[r].pixels.length / 4;

  // divide the totals by the number of pixels to find the average.
  avgRed /= numPixels;
  avgGreen /= numPixels;
  avgBlue /= numPixels;
  

    // Set the fill color to the average color of the pixels
  fill(avgRed, avgGreen, avgBlue,150);
  rectMode(CENTER);
  rect(width-200, height / 2, 300, 750);
  //image(cg,0,0);
  fill(60,20,20);
  textSize(18);
  rectMode(CORNER);
  text(lines.join(" "), width-330, height/10,250, 850 );
  //console.log(r);

}

function mouseClicked() {
  lines = markov.generate(2);
  //textSize(24);
  //x = width;
  //y =width-300;
  drawText();
  //saveCanvas( 'myCanvas', 'png')

}
function keyPressed() {
  print();  
}
