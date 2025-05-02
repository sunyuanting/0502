let capture;
let graphicsLayer;

function setup() {
  createCanvas(windowWidth, windowHeight); // Full-screen canvas
  capture = createCapture(VIDEO); // Capture video from the camera
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // Set capture size to 80% of window
  capture.hide(); // Hide the default video element
  graphicsLayer = createGraphics(capture.width, capture.height); // Create a graphics layer
}

function draw() {
  background('#ecf8f8'); // Set background color to ecf8f8

  // Draw the video feed
  push(); // Save the current drawing state
  translate((windowWidth + capture.width) / 2, (windowHeight - capture.height) / 2); // Move to the center of the video
  scale(-1, 1); // Flip horizontally
  image(capture, 0, 0); // Draw the flipped video
  pop(); // Restore the original drawing state

  // Draw the graphics layer above the video
  graphicsLayer.clear(); // Clear the graphics layer
  graphicsLayer.background('#e7d8c9'); // Set the background color to e7d8c9

  // Draw a grid with circles using a fixed color
  graphicsLayer.noStroke(); // Disable stroke for circles
  graphicsLayer.fill('#eee4e1'); // Set circle color to eee4e1
  for (let x = 0; x < graphicsLayer.width; x += 20) {
    for (let y = 0; y < graphicsLayer.height; y += 20) {
      graphicsLayer.ellipse(x + 10, y + 10, 15, 15); // Draw a circle in each grid unit
    }
  }

  image(graphicsLayer, (windowWidth - capture.width) / 2, (windowHeight - capture.height) / 2); // Overlay the graphics layer
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // Update capture size
  graphicsLayer = createGraphics(capture.width, capture.height); // Resize the graphics layer
}
