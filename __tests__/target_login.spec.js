var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Home Page", () => {
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
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(localChromeOption)
            .build();

        console.log("started testing");
        // driver.manage().window().maximize();
        await driver.get('http://www.target.com')

    });

    after(async () => {
        driver.quit();
    });

    describe("Header", () => {
        it("should exist", async () => {
            await driver.sleep(5000);
            let title = await driver.getTitle()
            console.log(assert.equal(title, "Target : Expect More. Pay Less."));
        });

        it("get onto login page", async () => {
            let userAccount = await driver.findElement(By.id(`account`));
            let isUserAccountDisplayed = await userAccount.isDisplayed();
            assert.equal(isUserAccountDisplayed, 1);
            await userAccount.click();
            await driver.sleep(4000);
            let signInMenu = driver.findElement(By.id(`accountNav-signIn`));
            let isSignInMenuDisplayed = await signInMenu.isDisplayed();
            assert.equal(isSignInMenuDisplayed, 1);
            await signInMenu.click();
            await driver.sleep(4000);
        });

        it("sign in with username & password", async () => {
            let usernameField = await driver.findElement(By.id(`username`));
            let isUsernameFieldDisplayed = await usernameField.isDisplayed();
            assert.equal(isUsernameFieldDisplayed, 1);
            await usernameField.click();
            await usernameField.sendKeys(process.env.target_user);
            let passwordField = driver.findElement(By.id(`password`));
            let isPasswordFieldDisplayed = await passwordField.isDisplayed();
            assert.equal(isPasswordFieldDisplayed, 1);
            await passwordField.click();
            await passwordField.sendKeys(process.env.target_password);
            let clickSignIn = driver.findElement(By.id(`login`));
            let isSignInButtonDisplayed = await clickSignIn.isDisplayed();
            assert.equal(isSignInButtonDisplayed, 1);
            await clickSignIn.click();
            await driver.sleep(5000);
        });   
    });
});
