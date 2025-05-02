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
  background('#ecf8f8'); // 設定背景顏色為 ecf8f8

  // 繪製攝影機影像，直接水平翻轉
  push(); // 儲存當前繪圖狀態
  translate(width, 0); // 將原點移動到右上角
  scale(-1, 1); // 水平翻轉影像
  image(capture, 0, (height - capture.height) / 2, capture.width, capture.height); // 繪製翻轉後的影像
  pop(); // 恢復原始繪圖狀態

  // 在影像上方繪製圖層
  graphicsLayer.clear(); // 清除圖層內容
  graphicsLayer.background('#e7d8c9'); // 設定圖層背景顏色為 e7d8c9

  // 繪製網格與圓形，圓形顏色採用影像相對位置的顏色
  capture.loadPixels(); // 載入影像的像素資料
  graphicsLayer.noStroke(); // 禁用圓形的邊框
  for (let x = 0; x < graphicsLayer.width; x += 20) {
    for (let y = 0; y < graphicsLayer.height; y += 20) {
      let index = ((y * capture.width) + x) * 4; // 計算像素索引
      let r = capture.pixels[index]; // 紅色通道
      let g = capture.pixels[index + 1]; // 綠色通道
      let b = capture.pixels[index + 2]; // 藍色通道
      graphicsLayer.fill(r, g, b); // 設定圓形顏色
      graphicsLayer.ellipse(x + 10, y + 10, 15, 15); // 在每個網格單位內繪製圓形
    }
  }

  image(graphicsLayer, (width - capture.width) / 2, (height - capture.height) / 2); // 將圖層疊加在影像上
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  graphicsLayer = createGraphics(capture.width, capture.height); // 調整圖層大小
}
