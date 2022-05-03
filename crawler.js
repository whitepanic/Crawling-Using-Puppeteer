const puppeteer = require('puppeteer');

( async() => {
  console.info("start....")
  console.info("puppeteer", puppeteer)

  const browser = await puppeteer.launch({
    headless: false,
    // args: [ "--window-size=1920,1000"],
    slowMo: 30,
  })

  const page = await browser.newPage()

  // await page.setViewport({ width: 1920, height: 1000 })

  await Promise.all([
    page.goto("http://www.naver.com"),
    page.waitForNavigation()
  ])

  let target = "//span[text()='쇼핑']/ancestor::a"
  await page.waitForXPath(target)
  let s = await page.$x(target)
  s = s[0]
  
  await Promise.all([
    await s.click(),
    page.waitForNavigation()
  ])

  target = "//ul[@id='categoryListPage1']/li/button"
  await page.waitForXPath(target)
  s = await page.$x(target)

  for ( item of s ) {
    const value = await item.evaluate(el => el.textContent);
    console.info(value.trim())
  }

  target = "//input[@title='검색어 입력']"
  await page.waitForXPath(target)
  s = await page.$x(target)
  s = s[0]
  await s.type("여름 옷")

  await page.waitForTimeout(3000)
  await browser.close()

})();