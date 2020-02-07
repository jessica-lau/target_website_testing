var webdriver = require('selenium-webdriver'),
By = webdriver.By;
require('selenium-webdriver/testing');

var assert = require('assert');

describe("Home Page", () => {
  let driver;

  before(async () => {
    var capabilities = {
      'browserName': 'Chrome',
      'browser_version': '60.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1024x768',
      'browserstack.user': process.env.browserstack_user,
      'browserstack.key': process.env.browserstack_key,
      'name': 'B Sample Test'
    };

    // var builder = new webdriver.Builder().
    //   usingServer('http://hub-cloud.browserstack.com/wd/hub').
    //   withCapabilities(capabilities);
    // driver = await builder.build();
     driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    console.log("started testing");
    await driver.get('http://www.target.com')
  });

  after(async () => {
    driver.quit();
  });

  describe("Header", () => {
    it.skip("should exist", async () => {
      let title = await driver.getTitle()
      console.log(assert.equal(title, "Target : Expect More. Pay Less."));

    });

    it("search item on homepage", async () => {
      let element = await driver.findElement(By.id(`search`));
      await element.sendKeys('chips\n');
      await driver.sleep(5000);
      let chipsElement = await driver.findElement(By.className(`h-text-lg`));
      let result = await chipsElement.getText();
      console.log("result:" + result);
      console.log(assert.equal(result, "chips"));
      await driver.sleep(5000);      

    });

    it("search if cart exists", async () => {
      let element = await driver.findElement(By.id(`cart`));
      var isDisplayed = await element.isDisplayed();
      assert.equal(isDisplayed, 1);
      await element.click();
      await driver.sleep(5000);
      let cartElement = await driver.findElement(By.id(`cart-container`));
      var isCartElementDisplayed = await cartElement.isDisplayed();
      assert.equal(isCartElementDisplayed, 1);
    
    });

    it("search if profile exists", async () => {
      let element = await driver.findElement(By.id(`account`));
      var isDisplayed = await element.isDisplayed();
      assert.equal(isDisplayed, 1);
      await element.click();
      await driver.sleep(5000);
      let profileElement = await driver.findElement(By.id(`accountNav-myStore`));
      var isProfileElementDisplayed = await profileElement.isDisplayed();
      assert.equal(isProfileElementDisplayed, 1);
    
    });
  });
});
