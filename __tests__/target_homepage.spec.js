var webdriver = require('selenium-webdriver')
, By = webdriver.By;
require('selenium-webdriver/testing');

var assert = require('assert')

describe("Home Page", () => {
   let driver;
  
    beforeEach(async () => {
      var builder = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      driver = await builder.build();

        await driver.get('http://www.target.com')
    });
  
    afterEach(async () => {
      // driver.quit();
    });
  
    describe("Header", () => {
      it("should exist", async () => {
        let title =   await driver.getTitle()
        assert.equal(title,"Target : Expect More. Pay Less.");

      });
  
      it("search item on homepage", async () => {
        let element = await driver.findElement(By.id(`search`));
        await element.sendKeys('chips\n');
        // await driver.sleep(4000);
        let chipsElement = await driver.findElement(By.className(`h-text-lg`));
        let result = await chipsElement.getText();
        console.log("result:" + result);
        console.log(assert.equal(result, "chips"));
        // await driver.sleep(4000);

      });
    });
  });