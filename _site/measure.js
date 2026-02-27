const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('file://' + path.resolve('index.html'));

  const result = await page.evaluate(() => {
    const h2 = document.querySelector('h2#news');
    const h2Rect = h2.getBoundingClientRect();
    
    const li = document.querySelector('.news-list li');
    const date = li.querySelector('.date');
    const dateRect = date.getBoundingClientRect();
    
    // Create range to find the exact start position of the text node after the date
    const textNode = li.childNodes[1]; // Should be the " Our paper " text node
    const range = document.createRange();
    range.setStart(textNode, 1); // skip the space
    range.setEnd(textNode, 2);
    const textRect = range.getBoundingClientRect();

    // Check ul position
    const ul = document.querySelector('.news-list');
    const ulRect = ul.getBoundingClientRect();

    return {
      name: "Viewport Width: " + window.innerWidth,
      h2: h2Rect.left,
      ul: ulRect.left,
      date: dateRect.left,
      textStart: textRect.left
    };
  });

  console.log(result);
  await browser.close();
})();
