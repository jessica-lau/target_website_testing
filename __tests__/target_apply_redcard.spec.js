var webdriver = require('selenium-webdriver'),
    By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Apply Red Card", () => {
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

        it.skip("apply for redcard credit", async () => {
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

            let windows = await driver.getAllWindowHandles();
            let currentWindow = await driver.getWindowHandle();
            console.log(windows);
            console.log(currentWindow);
            await driver.switchTo().window(windows[1]);

            //Personal Information Form
            let firstName = driver.findElement(By.id(`txtFirstName`));
            let isFirstNameDisplayed = await firstName.isDisplayed();
            assert.equal(isFirstNameDisplayed, 1);
            await firstName.click();
            await firstName.sendKeys('Jessica');

            let lastName = driver.findElement(By.id(`txtLastName`));
            let isLastNameDisplayed = await lastName.isDisplayed();
            assert.equal(isLastNameDisplayed, 1);
            await lastName.click();
            await lastName.sendKeys('None');

            let phoneNumber = driver.findElement(By.id(`txtPhonePrimary`));
            let isPhoneNumberDisplayed = await phoneNumber.isDisplayed();
            assert.equal(isPhoneNumberDisplayed, 1);
            await phoneNumber.click();
            await phoneNumber.sendKeys('555-555-5555');

            let phoneType = driver.findElement(By.id(`txtPhoneTypePrimary`));
            let isPhoneTypeDisplayed = await phoneType.isDisplayed();
            assert.equal(isPhoneTypeDisplayed, 1);
            await phoneType.click();
            let phoneHome = driver.findElement(By.css(`[value="H"]`));
            let isPhoneHomeDisplayed = await phoneHome.isDisplayed();
            assert.equal(isPhoneHomeDisplayed, 1);
            await phoneHome.click();

            let email = driver.findElement(By.id(`txtEmail`));
            let isEmailDisplayed = await email.isDisplayed();
            assert.equal(isEmailDisplayed, 1);
            await email.click();
            await email.sendKeys('freelancegigtest@gmail.com');

            let confirmEmail = driver.findElement(By.id(`txtConfirmEmail`));
            let isConfirmEmailDisplayed = await confirmEmail.isDisplayed();
            assert.equal(isConfirmEmailDisplayed, 1);
            await confirmEmail.click();
            await confirmEmail.sendKeys('freelancegigtest@gmail.com');

            let continueButton = driver.findElement(By.css(`[value="continue  "]`));
            let isContinueButtonDisplayed = await continueButton.isDisplayed();
            assert.equal(isContinueButtonDisplayed, 1);
            await continueButton.click();
            await driver.sleep(3000);

            //Security Information Form

            //***Alternative code to select birth month in dropdown
            // let birthMonth = driver.findElement(By.id(`birthdateMonth`));
            // let isBirthMonthDisplayed = await birthMonth.isDisplayed();
            // assert.equal(isBirthMonthDisplayed, 1);
            // await birthMonth.click();
            // let selectMonth = await birthMonth.findElements(By.css(`option`));
            // let isSelectMonthDisplayed = await selectMonth[2].isDisplayed();
            // assert.equal(isSelectMonthDisplayed, 1);
            // await selectMonth[2].click();
            // await driver.sleep(3000);

            let birthMonth = driver.findElement(By.id(`birthdateMonth`));
            let isBirthMonthDisplayed = await birthMonth.isDisplayed();
            assert.equal(isBirthMonthDisplayed, 1);
            await birthMonth.click();
            let selectMonth = driver.findElement(By.css(`[value="2"]`));
            let isSelectMonthDisplayed = await selectMonth.isDisplayed();
            assert.equal(isSelectMonthDisplayed, 1);
            await selectMonth.click();

            let birthDay = driver.findElement(By.id(`birthdateDay`));
            let isBirthDayDisplayed = await birthDay.isDisplayed();
            assert.equal(isBirthDayDisplayed, 1);
            await birthDay.click();
            let selectDay = driver.findElement(By.css(`[value="15"]`));
            let isSelectDayDisplayed = await selectDay.isDisplayed();
            assert.equal(isSelectDayDisplayed, 1);
            await selectDay.click();

            let birthYear = driver.findElement(By.id(`birthdateYear`));
            let isBirthYearDisplayed = await birthYear.isDisplayed();
            assert.equal(isBirthYearDisplayed, 1);
            await birthYear.click();
            await birthYear.sendKeys('1995');

            let socialNumber = driver.findElement(By.id(`txtSSN1`));
            let isSocialNumberDisplayed = await socialNumber.isDisplayed();
            assert.equal(isSocialNumberDisplayed, 1);
            await socialNumber.click();
            await socialNumber.sendKeys('1111111111');

            let socialNumberConfirm = driver.findElement(By.id(`txtSSNConfirm1`));
            let isSocialNumberConfirmDisplayed = await socialNumberConfirm.isDisplayed();
            assert.equal(isSocialNumberConfirmDisplayed, 1);
            await socialNumberConfirm.click();
            await socialNumberConfirm.sendKeys('1111111111');

            let idNumber = driver.findElement(By.id(`idNum`));
            let isIdNumberDisplayed = await idNumber.isDisplayed();
            assert.equal(isIdNumberDisplayed, 1);
            await idNumber.click();
            await idNumber.sendKeys('SDK8888888');

            let idState = driver.findElement(By.id(`idState`));
            let isIdStateDisplayed = await idState.isDisplayed();
            assert.equal(isIdStateDisplayed, 1);
            await idState.click();
            let selectState = driver.findElement(By.css(`[value= "MA"]`));
            let isSelectStateDisplayed = await selectState.isDisplayed();
            assert.equal(isSelectStateDisplayed, 1);
            await selectState.click();

            let continueButton2 = driver.findElement(By.css(`[value= "continue  "]`));
            let isContinueButton2Displayed = await continueButton2.isDisplayed();
            assert.equal(isContinueButton2Displayed, 1);
            await continueButton2.click();
            await driver.sleep(5000);
        });

    });
});