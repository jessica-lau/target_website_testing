var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("increase quantity of selected item", () => {
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

        it("search item on homepage", async () => {
            let searchItem = await driver.findElement(By.id(`search`));
            await searchItem.sendKeys('aveeno\n');
            await driver.sleep(5000);
            let searchItemElement = await driver.findElement(By.className(`h-text-lg`));
            let result = await searchItemElement.getText();
            console.log("result:" + result);
            console.log(assert.equal(result, "aveeno"));
            await driver.sleep(5000);

        });

        it("select item", async () => {
            let selectItem = await driver.findElement(By.css(`[aria-label="Unscented Aveeno Daily Moisturizing Lotion For Dry Skin - 18 fl oz"]`));
            let isSelectItemDisplayed = await selectItem.isDisplayed();
            assert.equal(isSelectItemDisplayed, 1);
            await selectItem.click();
            await driver.sleep(5000);

        });

        it("increaseItemQuantity", async() => {
            let increaseItem = await driver.findElement(By.css(`[data-test="custom-quantity-picker"]`));
            let isIncreaseItemDisplayed = await increaseItem.isDisplayed();
            assert.equal(isIncreaseItemDisplayed, 1);
            await increaseItem.click();

            let chooseItemQuantity = await driver.findElement(By.css(`[aria-label="3"]`));
            let isChooseItemQuantityDisplayed = await chooseItemQuantity.isDisplayed();
            assert.equal(isChooseItemQuantityDisplayed, 1);
            await chooseItemQuantity.click();
            await driver.sleep(5000);

        });

    });
});