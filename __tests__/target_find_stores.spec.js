var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Find Store", () => {
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

        it("find store location", async () => {
            let findStore = await driver.findElement(By.linkText(`Find Stores`));
            let isFindStoreDisplayed = await findStore.isDisplayed();
            assert.equal(isFindStoreDisplayed, 1);
            await findStore.click();
            await driver.sleep(5000);
            let filterServices = await driver.findElement(By.css(`[data-test="storeLocator-filterByServicesButton"]`));
            let isFilterServicesDisplayed = await filterServices.isDisplayed();
            assert.equal(isFilterServicesDisplayed, 1);
            await filterServices.click();
            await driver.sleep(5000);
            let checkboxServices = await driver.findElement(By.css(`[for="Opt"]`));
            let isCheckboxServicesDisplayed = await checkboxServices.isDisplayed();
            assert.equal(isCheckboxServicesDisplayed, 1);
            await checkboxServices.click();
            await driver.sleep(10000);
            let doneFiltering = await driver.findElement(By.css(`[data-test="storeLocator-filterByServicesDoneButton"]`));
            let isDoneFilteringDisplayed = await doneFiltering.isDisplayed();
            assert.equal(isDoneFilteringDisplayed, 1);
            await filterServices.click();
            await driver.sleep(5000);
        });
    });
});