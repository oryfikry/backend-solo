// Import puppeteer
import puppeteer from 'puppeteer';

import fs  from 'fs';
// const puppeteer = require('puppeteer');

async function scrape() {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the webpage
  let number = 1
  while(number < 150){
    await page.goto('https://komikindo.id/solo-leveling-chapter-/'+ number++);
    // Wait for the page to load
    await page.waitForSelector('#content');
    // Extract the data we want from the page
    const data = await page.evaluate(() => {
      // Select the element containing the image elements
      const containerElement = document.querySelectorAll('#chimg-auh img');
  
      // Extract the data from the elements and add it to an array
      const imageUrls = [];
      containerElement.forEach(imageElement => {
        imageUrls.push(imageElement.src);
      });
  
      // Return the array of data
      return imageUrls;
    });
  
    // Log the data to the console
    console.log(data);
    const jsondata = JSON.stringify([{urlData:data}])
    // fs.writeFile("output-solo-leveling-"+ number +".json", jsondata, 'utf8', function (err) {
    //     if (err) {
    //         console.log("An error occured while writing JSON Object to File.");
    //         return console.log(err);
    //     }
    
    //     console.log("JSON file has been saved.");
    // });

  }

  // Close the browser
  await browser.close();
}

scrape();