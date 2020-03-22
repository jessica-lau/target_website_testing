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

        it("select pinterest", async () => {
            let socialMedia = await driver.findElement(By.css(`[data-test="footerMenu-Social"]`));
            let isSocialMediaDisplayed = await socialMedia.isDisplayed();
            assert.equal(isSocialMediaDisplayed, 1);
            await socialMedia.click();
            await driver.sleep(5000);
            let pinterest = await driver.findElement(By.css(`[aria-label="Pinterest"]`));
            let isPinterestDisplayed = await pinterest.isDisplayed();
            assert.equal(isPinterestDisplayed, 1);
            await pinterest.click();
            await driver.sleep(5000);
            let openPinterestModal = await driver.findElement(By.css(`[data-test="externaLinkModal--stayButton"]`));
            let isOpenPinterestDisplayed = await openPinterestModal.isDisplayed();
            assert.equal(isOpenPinterestDisplayed, 1);
            await openPinterestModal.click();
        });

        it("select facebook", async () => {
            let socialMedia = await driver.findElement(By.css(`[data-test="footerMenu-Social"]`));
            let isSocialMediaDisplayed = await socialMedia.isDisplayed();
            assert.equal(isSocialMediaDisplayed, 1);
            await socialMedia.click();
            await driver.sleep(5000);
            let facebook = await driver.findElement(By.css(`[aria-label="Facebook"]`));
            let isFacebookDisplayed = await facebook.isDisplayed();
            assert.equal(isFacebookDisplayed, 1);
            await facebook.click();
            await driver.sleep(5000);
            let openFacebookModal = await driver.findElement(By.css(`[data-test="externaLinkModal--stayButton"]`));
            let isOpenFacebookDisplayed = await openFacebookModal.isDisplayed();
            assert.equal(isOpenFacebookDisplayed, 1);
            await openFacebookModal.click();
        });

        it("select instagram", async () => {
            let socialMedia = await driver.findElement(By.css(`[data-test="footerMenu-Social"]`));
            let isSocialMediaDisplayed = await socialMedia.isDisplayed();
            assert.equal(isSocialMediaDisplayed, 1);
            await socialMedia.click();
            await driver.sleep(5000);
            let instagram = await driver.findElement(By.css(`[aria-label="Instagram"]`));
            let isInstagramDisplayed = await instagram.isDisplayed();
            assert.equal(isInstagramDisplayed, 1);
            await instagram.click();
            await driver.sleep(5000);
            let openInstagramModal = await driver.findElement(By.css(`[data-test="externaLinkModal--stayButton"]`));
            let isOpenInstagramDisplayed = await openInstagramModal.isDisplayed();
            assert.equal(isOpenInstagramDisplayed, 1);
            await openInstagramModal.click();
        });

        it("select twitter", async () => {
            let socialMedia = await driver.findElement(By.css(`[data-test="footerMenu-Social"]`));
            let isSocialMediaDisplayed = await socialMedia.isDisplayed();
            assert.equal(isSocialMediaDisplayed, 1);
            await socialMedia.click();
            await driver.sleep(5000);
            let twitter = await driver.findElement(By.css(`[aria-label="Twitter"]`));
            let isTwitterDisplayed = await twitter.isDisplayed();
            assert.equal(isTwitterDisplayed, 1);
            await twitter.click();
            await driver.sleep(5000);
            let openTwitterModal = await driver.findElement(By.css(`[data-test="externaLinkModal--stayButton"]`));
            let isOpenTwitterDisplayed = await openTwitterModal.isDisplayed();
            assert.equal(isOpenTwitterDisplayed, 1);
            await openTwitterModal.click();
        });

        it("select youtube", async () => {
            let socialMedia = await driver.findElement(By.css(`[data-test="footerMenu-Social"]`));
            let isSocialMediaDisplayed = await socialMedia.isDisplayed();
            assert.equal(isSocialMediaDisplayed, 1);
            await socialMedia.click();
            await driver.sleep(5000);
            let youtube = await driver.findElement(By.css(`[aria-label="Youtube"]`));
            let isYoutubeDisplayed = await youtube.isDisplayed();
            assert.equal(isYoutubeDisplayed, 1);
            await youtube.click();
            await driver.sleep(5000);
            let openYoutubeModal = await driver.findElement(By.css(`[data-test="externaLinkModal--stayButton"]`));
            let isOpenYoutubeDisplayed = await openYoutubeModal.isDisplayed();
            assert.equal(isOpenYoutubeDisplayed, 1);
            await openYoutubeModal.click();
        });
    });
});