const { Builder, Browser } = require('selenium-webdriver');
const { executeLogin } = require('./Login.js');
const { BenchlistView } = require('../../pages/LoginProcess/BenchlistView.js');

(async function runTests() {
    let driver;
    
    try {
        // 새로운 driver 인스턴스 생성
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        
        // 1단계: Login.js 실행
        console.log('\n=== 로그인 프로세스 시작 ===');
        await executeLogin(driver);  // driver를 인자로 전달
        console.log('=== 로그인 프로세스 완료 ===\n');

        // 2단계: Benchlist 테스트
        console.log('\n=== Benchlist 테스트 시작 ===');
        
        await driver.get('https://dev.hyperlab.hits.ai/lab/2000000000427/project/30000000000001099/benches/31300/scaffold');
        console.log('페이지 로드 완료');

        const benchlistView = new BenchlistView(driver);
        await benchlistView.verifyAddMoleculeButtonDisplayed();
        await benchlistView.clickAddMoleculeButton();
        
        console.log('=== Benchlist 테스트 완료 ===\n');

    } catch (error) {
        console.error('테스트 실패:', error);
        throw error;
    } finally {
        if (driver) {
            await driver.sleep(1000);
            await driver.quit();
            console.log('브라우저 종료');
        }
    }
})();