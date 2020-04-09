/*
 * Generates Mandelbrot set images.
 * By default images are stored to ./images.
 * Modify width variable to change image size.
 */

const { convertColor, generateMandelbrot } = require('./modules/functions');
const Jimp = require('jimp');

// Set the width and height of image
// Modify width variable to generate different size images
let width = 2048;
let height = width / 2;

// Store file title for later use, single variable allows for change
// at single line of code.
const fileTitle = `mandelbrot-${width}x${height}`;

// Variable for the image data can become 
// very large and take up a decent amount of RAM.

// imageValues[columns/x][rows/y]
let imageValues = []

for (let x = 0; x < width; x++) { // Loop through columns.
  let column = []
  for (let y = 0; y < height; y++) { // Loop through rows.
    // Store image color values
    column.push(
      convertColor(
        generateMandelbrot(
          (x - (0.75 * width)) / (width / 4),
          (y - (width / 4)) / (width / 4)
        )
      )
    );
  }
  console.log(`( ${x} ) | ( ${width-x} )`)
  imageValues.push(column);
}

let image = new Jimp(width, height, 0x0, (err, image) => {
  if (err) {
    process.exit();
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      image.setPixelColor(imageValues[x][y], x, y);
    }
  }
  image.write(`./images/${fileTitle}.png`);
});