require('dotenv').config()
var webdriver = require('selenium-webdriver')        
, By = webdriver.By
, until = webdriver.until;

// Input capabilities
// var capabilities = {
//     'browserName' : 'Chrome',
//     'browser_version' : '60.0',
//     'os' : 'Windows',
//     'os_version' : '10',
//     'resolution' : '1024x768',
//     'browserstack.user' : process.env.browserstack_user,
//     'browserstack.key' : process.env.browserstack_key,
//     'name' : 'Bstack-[Node] Sample Test'
//    }
// var driver = new webdriver.Builder().
//   usingServer('http://hub-cloud.browserstack.com/wd/hub').
//   withCapabilities(capabilities).
//   build();

var driver = new webdriver.Builder()
.withCapabilities(webdriver.Capabilities.chrome())
.build();
console.log("started testing");

async function runTest(){
await driver.get('http://www.target.com')
let element = await driver.findElement(By.id(`search`));
await element.sendKeys('chips\n');
await driver.sleep(4000);
let title =   await driver.getTitle()
      console.log(title);
      driver.sleep(4000);

      driver.quit();
      console.log("ended");

console.log("ended2");
}

runTest();