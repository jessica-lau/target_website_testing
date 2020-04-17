var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Favorites", () => {
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

        //Note: run test on local broswer:
        let localChromeOption = new chrome.Options();
        localChromeOption.addArguments("--start-maximized");
        localChromeOption.addArguments("--disable-web-security");
        localChromeOption.addArguments("--allow-running-insecure-content");
        localChromeOption.setAcceptInsecureCerts(true)
        driver = await new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(localChromeOption)
            .build();

        console.log("started testing");
        // driver.manage().window().maximize();
        await driver.get('http://www.target.com')

    });

    after(async () => {
    await driver.quit();
    });

    describe("Header", () => {
        it("should exist", async () => {
            await driver.sleep(5000);
            let title = await driver.getTitle()
            console.log(assert.equal(title, "Target : Expect More. Pay Less."));
        });

        it("find giftcards", async () => {
            let giftcards = await driver.findElement(By.linkText(`Gift Cards`));
            let isGiftCardsDisplayed = await giftcards.isDisplayed();
            assert.equal(isGiftCardsDisplayed, 1);
            await giftcards.click();
            // let giftCardBalance = await driver.findElement(By.className(`ItemTitle-yw3r8r-0 jQnKhK`));
            // let isGiftCardBalanceDisplayed = await giftCardBalance.isDisplayed();
            // assert.equal(isGiftCardBalanceDisplayed, 1);
            // await giftCardBalance.click();
            // await driver.sleep(5000);
            // let giftCardNumber = await driver.findElement(By.id(`giftCardNumber`));
            // let isGiftCardNumberDisplayed = await giftCardNumber.isDisplayed();
            // assert.equal(isGiftCardNumberDisplayed, 1);
            // await giftCardNumber.sendKeys(041215177920662);
            // let giftCardAccess = await driver.findElement(By.id(`accessNumber`));
            // let isGiftCardAccessDisplayed = await giftCardAccess.isDisplayed();
            // assert.equal(isGiftCardAccessDisplayed, 1);
            // await giftCardAccess.sendKeys(15826471);
            // let checkBalance = await driver.findElement(By.id(`queryGiftCard`));
            // let isCheckBalanceDisplayed = await checkBalance.isDisplayed();
            // assert.equal(isCheckBalanceDisplayed, 1);
            // await checkBalance.click();
            // await driver.sleep(5000);

        });
    });
});