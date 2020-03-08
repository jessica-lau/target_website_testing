var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Help", () => {
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

        it("search help", async () => {
            let help = await driver.findElement(By.css(`[data-test="footerMenu-Help"]`));
            let isHelpDisplayed = await help.isDisplayed();
            assert.equal(isHelpDisplayed, 1);
            await help.click();
            await driver.sleep(5000);
        });

        it("search contact us", async () => {
            let contactUs = await driver.findElement(By.css(`[aria-label="Contact Us"]`));
            let isContactUsDisplayed = await contactUs.isDisplayed();
            assert.equal(isContactUsDisplayed, 1);
            await contactUs.click();

            let helpTopic = await driver.findElement(By.css(`[aria-labelledby="choose topic"]`));
            let ishelpTopicDisplayed = await helpTopic.isDisplayed();
            assert.equal(ishelpTopicDisplayed, 1);
            await helpTopic.click();

            let helpDropdown = await driver.findElement(By.className(`dropdown-menu`));
            let selectionList = await helpDropdown.findElements(By.css(`li`));
            let ishelpDropdownDisplayed = await helpDropdown.isDisplayed();
            assert.equal(ishelpDropdownDisplayed, 1);
            console.log(helpDropdown)
            for (let listItem of selectionList) {
                let text = await listItem.getText()
                console.log(text)
                if (text === "Corporate Information") {
                    listItem.click()
                }
            }
            await driver.sleep(5000);
        });
    });
});