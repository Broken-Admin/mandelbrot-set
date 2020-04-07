const { complex, add, multiply, abs, sin, sqrt, pi, equal, sort, format } = require('mathjs');
const { lerp, inverseLerp } = require('./lerp-modules');
const Jimp = require('jimp');


/*
 * Various functions used to generate mandelbrot color values.
 */

/**
 * @summary Convert `c`, an array of decimal color values to a single RGBA (Red, Green, Blue, Alpha/Opacity) hex.
 * @param {number[]} c An array of RGBA values. Value ranges are [0,255]
 * @returns {number} A converted RGBA hex color string. 
 */
function convertColor(c) {
  rgbConv(i)
  if (c.length < 3) {
    console.log("Error! convertColor not provided with R, G, or B value.");
    process.exit();
  } else if (!c[3]) { // If not provided value for Alpha/Opacity, default to 255.
    c[3] = 255;
  }
  /*for(let i=0;i<c.length;i++) { 
    let temp = c[i];    
    if(c[i] < 16) {
      c[i] = '0' + c[i].toString(16);
    } else {
      c[i] = c[i].toString(16);
    }
  }
  let color = `0x${c[0]}${c[1]}${c[2]}${c[3]}`;
  color = parseInt(color,16);
  */
  let color = Jimp.rgbaToInt(c[0], c[1], c[2], c[3]);
  return (color);
}

module.exports.convertColor = convertColor;

/**
 * @summary Makes use of lerp (linear interpolation) to create a range of RGB values. Returns an array. [R, G, B]
 * @param {number} i Value used to determine returned color values.
 * @returns {number[]} Array[3] of RGB color values in range [0,255], 
 */
function rgbConv(i) {
  // It is possible to change the maximum values of the inverse lerp functions to
  // change the hue of the outputted values. The higher the maximum value, the lower the returned
  // value for the R, G, or B in range [0,255].
  // For examples of very basic color hues see https://github.com/Broken-Admin/3bit-rgb
  let rPercent = inverseLerp(0, 10, i);
  let gPercent = inverseLerp(0, 35, i);
  let bPercent = inverseLerp(0, 50, i);
  // Use values returned from inverse lerp functions to generate a value
  // in range [0,255].
  let r = Math.round(
    lerp(0, 255, rPercent)
  );
  let g = Math.round(
    lerp(0, 255, gPercent)
  );
  let b = Math.round(
    lerp(0, 255, bPercent)
  );

  // Return values as array[3]
  return ([r, g, b])
}
// Interpret values from generateMandelbrot

module.exports.rgbConv = rgbConv;

/**
 * @summary Determines values within the Mandelbrot set, sending these values to be converted to a color.
 * @param {*} x 
 * @param {*} y 
 * @returns {number[]} Array[3] of RGB color values in range [0,255].
 */
function generateMandelbrot(x, y) {
  // Makes use of Mandelbrot function, f_c(z) = z^2 + c.
  // A value is within the mandelbrot set if it's recursive values do not
  // diverge (explode/go to infinity) when iterated from z = 0
  // i.e. for which the sequence - f_c(0), f_c(f_c(0)), f_c(f_c(f_c(0))), etcetera
  // - remains bounded in absolute value. 
  // We color the values of which escape the mandelbrot set or where f(z) >= 2.
  c0 = complex(x, y); // We take the (x,y) on the complex plane.
  c = 0
  // c = 0 is our starting value of z in f(z). We will use this to start our itteration
  // f(0), f(f(0), f(f(f(0)), etcetera.
  for (let i = 0; i < 1000; i++) {
    // I limit recursive checks at 1000, as it is the value of which the
    // reference I am using uses and it seems a valid number to take a decent amount
    // of time and do proper checks without melting my computer.
    // Start recursive function to check if f_c0(c) = c^2 + c
    // recursively escapes the Mandelbrot set
    // If it escapes the Mandelbrot set, it's color is determined by the itteration
    // of which it escapes. Smaller itterations produce darker colors,
    // higher itterations produce a brighter color. Overall the color
    // is determined by the itteration at which it escapes and the
    // maximum number of inverseLerp function calls within rgbConv.
    if (abs(c) > 2) { // Check if we have escaped the Mandelbrot set
      // If we have escaped the set, determine a color value in which
      // we use i as our value to determine such color
      return (); // Return our determined color value.
    }

    // If value has not escaped the Mandelbrot set, continue
    // recursive checks.
    c = multiply(c, c) // Perform recursive function of c_n = f_c0(c_n-1).
    c = add(c, c0); // Continuation of function.
  }
  // If our set never escapes Mandelbrot set, return black as RGB values.
  return ([0, 0, 0])

}

module.exports.generateMandelbrot = generateMandelbrot;