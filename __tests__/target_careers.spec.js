var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Careers Section", () => {
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

        it("search careers section", async () => {
            let moreSection = await driver.findElement(By.css(`[data-test="footerMenu-More"]`));
            let isMoreSectionDisplayed = await moreSection.isDisplayed();
            assert.equal(isMoreSectionDisplayed, 1);
            await moreSection.click();

            let careerSection = await driver.findElement(By.css(`[aria-label="Careers"]`));
            let isCareerSectionDisplayed = await careerSection.isDisplayed();
            assert.equal(isCareerSectionDisplayed, 1);
            await careerSection.click();
            await driver.sleep(5000);

            let corporateCareer = await driver.findElement(By.linkText("corporate"));
            let isCorporateCareerDisplayed = await corporateCareer.isDisplayed();
            assert.equal(isCorporateCareerDisplayed, 1);
            await corporateCareer.click();
            await driver.sleep(20000);

            let searchCorporateJob = await driver.findElement(By.className(`join-our-team--input input-underline`));
            await searchCorporateJob.sendKeys('analyst\n');
            await driver.sleep(10000);
            let corporateJobResult = await driver.findElement(By.linkText("search jobs"));
            let result = await corporateJobResult.getText();
            console.log("result:" + result);
            console.log(assert.equal(result, "search jobs"));


        });
    });
});