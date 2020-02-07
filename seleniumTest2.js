var webdriver = require('selenium-webdriver')
  , By = webdriver.By;
require('selenium-webdriver/testing');

var assert = require('assert')

describe("Home Page", () => {
  let driver;

  beforeEach(async () => {
    var capabilities = {
      'browserName': 'Chrome',
      'browser_version': '60.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1024x768',
      'browserstack.user': process.env.browserstack_user,
      'browserstack.key': process.env.browserstack_key,
      'name': 'B Sample Test'
    }

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

  // afterEach(async () => {
  //   driver.quit();
  // });

  describe("Header", () => {
    it("should exist", async () => {
      let title = await driver.getTitle()
      console.log(assert.equal(title, "Target : Expect More. Pay Less."));

    });

    it("search item on homepage", async () => {
      let element = await driver.findElement(By.id(`search`));
      await element.sendKeys('chips\n');
      await driver.sleep(4000);
      let chipsElement = await driver.findElement(By.className(`h-text-lg`));
      let result = await chipsElement.getText();
      console.log("result:" + result);
      console.log(assert.equal(result, "chips"));
      await driver.sleep(4000);

      driver.quit();

    });
  });
});