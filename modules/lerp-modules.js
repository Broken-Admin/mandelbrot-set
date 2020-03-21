/*
 * Linear Interpolation or Lerp, I do not 100% understand the concept but
 * the values it produces.
 * File used by functions.js to produce mandelbrot color values.
 */

/**
 * @summary Returns number value in relation to `a` and `b` by use of value `t` within range [0,1].
 * @param {number} a Minimum Value
 * @param {number} b Maximum Value
 * @param {number} t Value between `a` and `b`
 * When `t` = 0 returns `a`.
 * When `t` = 1 return `b`.
 * When `t` = 0.5 returns the midpoint of `a` and `b`.
 * @returns {number} Value within range [`a`,`b`] determined by the value `t` within [0,1] range.
 */
function lerp(a, b, t) {
  // Minimum can not be larger than maximum.
  if (a > b) return (-1);
  // Clamp within range [0,1].
  if (t > 1) t = 1;
  if (t < 0) t = 0;
  // Return value.
  return ((1 - t) * a + t * b)
}

module.exports.lerp = lerp;

/**
 * @summary Takes an interpolated value, a maximum, and a minimum. Determines the interpolation of value `i` in relation to minimum `a` and maximum `b`.
 * @param {number} a Minimum Value
 * @param {number} b Maximum Value
 * @param {number} i Value to interpolate
 * @returns {number} Value between [0,1] determined by the positon of value `i` within the range [`a`,`b`].
 */
function inverseLerp(a, b, i) {
  // Minimum can not be larger than maximum.
  if (a > b) return (-1);
  // Calculate t in relation to range [a,b].
  let t = (i - a) / (b - a);
  // t should not be out of range [0,1].
  // Clam within range [0,1].
  if (t > 1) t = 1;
  if (t < 0) t = 0;
  // Return value.
  return (t);
}

module.exports.inverseLerp = inverseLerp;