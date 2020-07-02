var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("whats new section", () => {
    let driver;

    before(async () => {
        var capabilities = {
            'browserName': 'Chrome',
            'browser_version': '60.0',
            'os': 'Windows',
            'os_version': '10',
            'resolution': '1920x1080',
            'browserstack.user': process.env.browserstack_user,
            'browserstack.key': process.env.browserstack_key,
            'name': 'B Sample Test'
        };
        //Note: run test on browserstacker:

        // var builder = new webdriver.Builder().
        //   usingServer('http://hub-cloud.browserstack.com/wd/hub').
        //   withCapabilities(capabilities);
        // driver = await builder.build();

        //Note: run test on local browser:
        let localChromeOption = new chrome.Options();
        localChromeOption.addArguments("--start-maximized");

        driver = await new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(localChromeOption)
            .build();

        console.log("started testing");
        //driver.manage().window().maximize();
        await driver.get('http://www.target.com');

    });

    after(async () => {
        await driver.quit();
    });

    describe("Header", () => {
        it.skip("should exist", async () => {
            let title = await driver.getTitle()
            console.log(assert.equal(title, "Target : Expect More. Pay Less."));
        });

        it("whats new", async () => {
            let moreMenu = await driver.findElement(By.css(`[aria-label="More menu"]`));
            let isMoreMenuDisplayed = await moreMenu.isDisplayed();
            assert.equal(isMoreMenuDisplayed, 1);
            await moreMenu.click();
            await driver.sleep(3000);

            let whatsNew = await driver.findElement(By.id(`more-gifting`));
            let isWhatsNewDisplayed = await whatsNew.isDisplayed();
            assert.equal(isWhatsNewDisplayed, 1);
            await whatsNew.click();
            await driver.sleep(3000);

            let giftIdeasElement = await driver.findElement(By.css(`[title= "Gift Ideas"]`));
            let result = await giftIdeasElement.getText();
            console.log("result: " + result);
            console.log(assert.equal(result, "Gift Ideas"))
            await driver.sleep(3000);

        });

    });
});