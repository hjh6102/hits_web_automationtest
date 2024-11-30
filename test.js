const { By, Builder, Browser } = require('selenium-webdriver');
const assert = require("assert");

(async function firstTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://hyperlab.hits.ai/');

        let title = await driver.getTitle();
        assert.equal("신약개발 연구원을 위한 AI 신약개발", title);

        await driver.manage().setTimeouts({ implicit: 500 });

        let gnbItems = await driver.findElements(By.className('gnbItem_JB8QI'));
        await gnbItems[1].click();

        // await gnbItem1.click();
        // console.log(gnbItem1);
        /*
        await driver.manage().setTimeouts({implicit: 500});
      
        let textBox = await driver.findElement(By.name('my-text'));
        let submitButton = await driver.findElement(By.css('button'));
      
        await textBox.sendKeys('Selenium');
        await submitButton.click();
      
        let message = await driver.findElement(By.id('message'));
        let value = await message.getText();
        assert.equal("Received!", value);
        */
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit()
    }
}())