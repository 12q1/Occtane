const puppeteer = require('puppeteer');

const run = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://www.oculus.com/compare/");
            let elements = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('._8xs0');
                items.forEach((item) => {
                    results.push({
                        text: item.innerText,
                    });
                });
                let cleanText = results[2].text.replace(/\n/g, " ").toLowerCase()
                if(cleanText.includes("out of stock")){ //Todo check dutch string?
                    return "Occulus Rift S is still out of stock"
                } else {
                    return "Occulus Rift is in stock!"
                    //need to send notification here
                }
            })
            browser.close();
            return resolve(elements);
        } catch (e) {
            return reject(e);
        }
    })
}
//Bastardized version of https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial by Nick Chikovani

run().then(console.log).catch(console.error);