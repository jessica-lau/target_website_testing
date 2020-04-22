var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Weekly Ad", () => {
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

        it("weekly ad", async () => {
            let weeklyAd = await driver.findElement(By.linkText(`Weekly Ad`));
            let isWeeklyAdDisplayed = await weeklyAd.isDisplayed();
            assert.equal(isWeeklyAdDisplayed, 1);
            await weeklyAd.click();
            await driver.sleep(3000);
            let viewWeeklyAd = await driver.findElement(By.className(`view-ad-track`));
            let isViewWeeklyAdDisplayed = await viewWeeklyAd.isDisplayed();
            assert.equal(isViewWeeklyAdDisplayed, 1);
            await viewWeeklyAd.click();
            await driver.sleep(3000);
            let viewNextPage = await driver.findElement(By.id(`nextArrow`));
            let isViewNextPageDisplayed = await viewNextPage.isDisplayed();
            assert.equal(isViewNextPageDisplayed, 1);
            await viewNextPage.click();
            await driver.sleep(5000);
            let zoomPage = await driver.findElement(By.className(`zoom`));
            let isZoomPageDisplayed = await zoomPage.isDisplayed();
            assert.equal(isZoomPageDisplayed, 1);
            await zoomPage.click();
            await driver.sleep(5000);
            let exitZoom = await driver.findElement(By.id(`closeButton`));
            let isExitZoomDisplayed = await exitZoom.isDisplayed();
            assert.equal(isExitZoomDisplayed,1);
            await exitZoom.click();
            await driver.sleep(3000);
        })
    });

});