var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Social Media", () => {
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
        it.skip("should exist", async () => {
            await driver.sleep(5000);
            let title = await driver.getTitle()
            console.log(assert.equal(title, "Target : Expect More. Pay Less."));
        });

        it("search social media", async () => {
            let socialMedia = await driver.findElement(By.css(`[data-test="footerMenu-Social"]`));
            let isSocialMediaDisplayed = await socialMedia.isDisplayed();
            assert.equal(isSocialMediaDisplayed, 1);
            await socialMedia.click();
            await driver.sleep(5000);
        });

        it("select youtube", async () => {
            let youtube = await driver.findElement(By.css(`[aria-label="Youtube"]`));
            let isYoutubeDisplayed = await youtube.isDisplayed();
            assert.equal(isYoutubeDisplayed, 1);
            await youtube.click();
            await driver.sleep(5000);
            let openYoutube = await driver.findElement(By.linkText("Continue"));
            let isOpenYoutubeDisplayed = await openYoutube.isDisplayed();
            assert.equal(isOpenYoutubeDisplayed, 1);
            await openYoutube.click();
            await driver.sleep(5000);
        });
    });
});