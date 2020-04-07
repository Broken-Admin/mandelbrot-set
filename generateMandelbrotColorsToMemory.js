/*
 * Generates Mandelbrot set images and their subsequent color data to json files in memory.
 * By default images are stored to ./images and json data files are stored to ./stored-values.
 * Modify width variable to change image size.
 */

const { convertColor, generateMandelbrot } = require('./modules/functions');
const Jimp = require('jimp');
const fs = require('fs')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


// Set the width and height of image
// Modify width variable to generate different size images
let width = 200;
let height = width / 2;
// Store file title for later use, single variable allows for change
// at single line of code.
const imageFileTitle = `mandelbrot-${width}x${height}`;
// "-data" is appended to the json values file.
const dataFileTitle = `${imageFileTitle}-colors`;

// Check if color values storage file exists.
// Default value being true could create issues.
let valuesFileExists = true;
if (!fs.existsSync(`./stored-values/${dataFileTitle}.json`)) {
  valuesFileExists = false;
}

// If file does not exist, create it, store values.
if (!valuesFileExists) {
  // Create file adapter and attach it to storage file
  const dataAdapter = new FileSync(`./stored-values/${dataFileTitle}.json`);
  const mandelbrotData = low(dataAdapter);

  // Set defaults
  mandelbrotData.defaults({ colorValues: [] })
    .write();

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
    // Display some data on the 
    console.log(`( Columns Finished - ${x + 1} ) | ( Columns Left - ${(width - 1) - x} )`);
    // Write column data to file
    mandelbrotData.get('colorValues')
      .push(column)
      .write();
  }
  console.log(`Value generation complete, writing color values to image file.`)
} else {
  console.log(`Stored values already exist.`);
  console.log(`Generating image from stored values.`);
  console.log(`If image appears to be corrupted delete file \"${dataFileTitle}.json\" to regenerate values to file.`);
}

// imageValues['colorValues'][columns/x][rows/y]
// Store file values to variable in parsed json
let imageValues = JSON.parse(fs.readFileSync(`./stored-values/${dataFileTitle}.json`))
let image = new Jimp(width, height, 0x0, (err, image) => {
  if (err) {
    console.log(-1);
    process.exit();
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      image.setPixelColor(imageValues['colorValues'][x][y], x, y);
    }
  }
  image.write(`./images/${imageFileTitle}.png`);
});