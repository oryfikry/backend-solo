import express  from'express';
import puppeteer from 'puppeteer';
import cors from 'cors'

const app = express();
app.use(cors());

async function scrape(numpage) {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    // Open a new page
    const page = await browser.newPage();
    
    // Navigate to the webpage
    console.log('https://komikindo.id/solo-leveling-chapter-'+ numpage)
    await page.goto('https://komikindo.id/solo-leveling-chapter-'+ numpage);
    var titlee = await page.title();
    // Wait for the page to load
    await page.waitForSelector('#content');
    // Extract the data we want from the page
    const data = await page.evaluate(() => {
        let imageUrls = [];
        // Select the element containing the image elements
        const containerElement = document.querySelectorAll('#chimg-auh img');
       
        // Extract the data from the elements and add it to an array
        
        containerElement.forEach(imageElement => {
          imageUrls.push(imageElement.src);
        });
        // imageUrls.push({title:titlee})
    
        // Return the array of data
        return imageUrls;
      });
     const array = []
      array.push({title:titlee,url:data})
      // Log the data to the console
      console.log(numpage);
    //   console.log(titlee);
      console.log(array);
      
      
      // Close the browser
      await browser.close();
      return array
  }

async function getData(x){
    await scrape(x)
}

  app.get('/baca/:id', async(req, res) => {
    let data = ''
    try{
       data = await scrape(req.params.id)
    }catch(err){
      console.log(err)
     
    }

      res.set('Referrer-Policy', 'no-referrer');
      res.send( 
          data
      )
  });


const port = 3000
app.listen(port, () => {
  console.log('Server listening on port '+port);
});
