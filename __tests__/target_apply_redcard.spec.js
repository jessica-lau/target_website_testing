var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Store Location", () => {
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

        it("apply for redcard credit", async () => {
            let applyRedCard = await driver.findElement(By.linkText(`RedCard`));
            let isApplyRedCardDisplayed = await applyRedCard.isDisplayed();
            assert.equal(isApplyRedCardDisplayed, 1);
            await applyRedCard.click();
            await driver.sleep(5000);
            let applyRedCardCredit = driver.findElement(By.linkText(`Apply for credit`));
            let isApplyRedCardCreditDisplayed = await applyRedCardCredit.isDisplayed();
            assert.equal(isApplyRedCardCreditDisplayed, 1);
            await applyRedCardCredit.click();
            await driver.sleep(5000);
        });

        it("apply for redcard debit", async () => {
            let applyRedCard = await driver.findElement(By.linkText(`RedCard`));
            let isApplyRedCardDisplayed = await applyRedCard.isDisplayed();
            assert.equal(isApplyRedCardDisplayed, 1);
            await applyRedCard.click();
            await driver.sleep(5000);
            let applyRedCardDebit = driver.findElement(By.linkText(`Apply for debit`));
            let isApplyRedCardDebitDisplayed = await applyRedCardDebit.isDisplayed();
            assert.equal(isApplyRedCardDebitDisplayed, 1);
            await applyRedCardDebit.click();
            await driver.sleep(5000);
        });
    });
});