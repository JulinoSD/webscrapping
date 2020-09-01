const fs = require('fs')

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/mana_maoli/');
    await page.screenshot({path: 'mana.png'});
    const imgList = await page.evaluate(() => {
      //executado no browser
      //pegar as imagens no post
      const nodeList = document.querySelectorAll('article img')
      //transformar nodelist em array
      const imgArray = [...nodeList]
      //transformar nodelist em objeto JS
      const imgList = imgArray.map(img =>({
        src: img.src
      }));

      //colocar para fora da função
      return imgList

    });
   //escrever os dados em arquivo local (json)
   fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
     if(err) throw new Error('Some part of code is not doing well');
     console.log('Good, you are getting better day-by-day, do it every time as you can, step gy step')
   })
    await browser.close();
  })();