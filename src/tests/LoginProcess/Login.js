const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { LoginView } = require('../../pages/LoginProcess/LoginView.js');
const { VerificationView } = require('../../pages/LoginProcess/VerificationView.js');
const assert = require("assert");

async function executeLogin() {
    let driver;
    
    try {
        // 드라이버 초기화
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        
        // 타임아웃 설정
        await driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 10000,
            script: 10000
        });

        // 페이지 로드
        console.log('페이지 로딩 시작...');
        await driver.get('https://dev.hyperlab.hits.ai/lab/2000000000427/project/30000000000001099/benches/31300/scaffold');
        await driver.sleep(2000);
        console.log('페이지 로드 완료');

        // LoginView 인스턴스 생성
        const loginView = new LoginView(driver);
        const verificationView = new VerificationView(driver);

        // 로그인 페이지에서 이메일 입력
        await driver.sleep(1000);
        await loginView.enterEmail('hjh6102@hits.ai');
        console.log('✓ 이메일 입력 완료');

        // 비밀번호 입력
        await driver.sleep(500);
        await loginView.enterPassword('Wlgus6102@');
        console.log('✓ 비밀번호 입력 완료');

        // 로그인 버튼 클릭
        await driver.sleep(500);
        await loginView.clickLoginButton();
        console.log('✓ 로그인 버튼 클릭 완료');

        // 인증번호 입력
        await driver.sleep(1000);
        await verificationView.enterVerify('000000');
        console.log('✓ 인증번호 입력 완료');

        // 테스트 결과 확인을 위한 대기
        await driver.sleep(3000);
        console.log('\n로그인 완료 ✨');

    } catch (error) {
        console.error('로그인 실패:', error);
        throw error;
    } finally {
        if (driver) {
            await driver.sleep(1000);
            await driver.quit();
            console.log('브라우저 종료');
        }
    }
}

// 직접 실행될 때와 import 될 때를 구분
if (require.main === module) {
    executeLogin().catch(error => {
        console.error('로그인 실행 중 오류 발생:', error);
        process.exit(1);
    });
} else {
    module.exports = { executeLogin };
}