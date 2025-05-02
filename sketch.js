let capture;
let graphicsLayer;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  capture = createCapture(VIDEO); // 從攝影機擷取影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏預設的影像元素
  graphicsLayer = createGraphics(capture.width, capture.height); // 建立一個與影像大小相同的圖層
}

function draw() {
  background('#ecf8f8');

  graphicsLayer.clear();
  graphicsLayer.background('#e7d8c9');

  capture.loadPixels();
  graphicsLayer.noStroke();

  for (let x = 0; x < graphicsLayer.width; x += 20) {
    let flippedX = capture.width - x - 1;

    for (let y = 0; y < graphicsLayer.height; y += 20) {
      let index = (y * capture.width + flippedX) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      graphicsLayer.fill(r, g, b);
      graphicsLayer.ellipse(x + 10, y + 10, 15, 15);
    }
  }

  // 將整個圖層左右鏡像貼到畫布中央
  push();
  translate((width + capture.width) / 2, (height - capture.height) / 2);
  scale(-1, 1);
  image(graphicsLayer, 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  graphicsLayer = createGraphics(capture.width, capture.height); // 調整圖層大小
}
