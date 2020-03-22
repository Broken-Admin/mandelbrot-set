## Mandelbrot Set Image Generator

- generateMandelbrot.js - Generates data to a variable in ram, originally the only version of the code.
- generateMandelbrotToMemory.js - Generates image color data to json files which can be used by the program to regenerate images at a later time.

### Information

- Files are documented to a valid extend and attemptedly understandable.
- Files in ./modules are various functions which are used by the generation files to generate the color values.
- Directories ./stored-values and ./images are to be used for the storage of data and image files. Deletion of these directories may cause issues in code.

### Demonstration
![4096x2048](md-image.png)

### Notes / TODO

- TODO: Possibly have the memory generation have a seperate version of which outputs values at which the Mandelbrot set is escaped.