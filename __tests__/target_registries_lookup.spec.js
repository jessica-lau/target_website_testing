var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Lookup Registries", () => {
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

        it("lookup registries", async () => {
            let registries = await driver.findElement(By.linkText(`Registries & Lists`));
            let isRegistriesDisplayed = await registries.isDisplayed();
            assert.equal(isRegistriesDisplayed, 1);
            await registries.click();
            let firstName = await driver.findElement(By.id(`registrySearchFirstName`));
            let isFirstNameDisplayed = await firstName.isDisplayed();
            assert.equal(isFirstNameDisplayed, 1);
            await firstName.sendKeys('Sam');
            let lastName = await driver.findElement(By.id(`registrySearchLastName`));
            let isLastNameDisplayed = await lastName.isDisplayed();
            assert.equal(isLastNameDisplayed, 1);
            await lastName.sendKeys('Lee');
            let searchName = await driver.findElement(By.css(`[type="submit"]`));
            let isSearchNameDisplayed = await searchName.isDisplayed();
            assert.equal(isSearchNameDisplayed, 1);
            await searchName.click();
            await driver.sleep(5000);
            let showFilters = await driver.findElement(By.className(`Button__ButtonWithStyles-sc-1phqvxd-0 bQUSlc`));
            let isShowFiltersDisplayed = await showFilters.isDisplayed();
            assert.equal(isShowFiltersDisplayed, 1);
            await showFilters.click();
            await driver.sleep(5000);
        })
    });

});