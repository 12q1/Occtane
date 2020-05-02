const puppeteer = require('puppeteer');
const mailer = require('./nodemailer_module.js')

const interval = 30000 //change this if you want default interval is 5 min (300000ms)

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
                const cleanText = results[2].text.replace(/\n/g, " ").toLowerCase()
                const currTime = new Date()
                if (cleanText.includes("out of stock")) { //Todo check dutch string?
                    return `Occulus Rift S is still out of stock (${currTime.getHours()}:${currTime.getMinutes()})`
                } else {
                    return `Occulus Rift S might be in stock! (${currTime.getHours()}:${currTime.getMinutes()})`
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

setInterval(
    () => {
        run()
            .then((res) => {
                console.log(res)
                if (res.includes('in stock!')) {
                    mailer()
                }
            })
            .catch(console.error)
    },
    interval
)