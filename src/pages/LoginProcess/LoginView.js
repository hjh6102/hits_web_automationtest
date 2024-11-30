const { By, until } = require('selenium-webdriver');
const assert = require('assert');

/**
 * LoginView 페이지의 요소들과 상호작용하는 Page Object
 */
class LoginView {
    // 타임아웃 상수
    static TIMEOUT = 5000;

    /**
     * @param {WebDriver} driver - Selenium WebDriver 인스턴스
     */
    constructor(driver) {
        this.driver = driver;
    }

    static LOCATORS = {
        emailInput: By.css('input[name="email"][placeholder="이메일"]'),
        passwordInput: By.css('input[name="password"][placeholder="비밀번호"]'),
        loginButton: By.css('button[type="submit"]')
    };

    /**
     * 로그인 이메일 입력
     * @param {string} email - 입력할 이메일 주소
     */
    async enterEmail(email) {
        try {
            const emailField = await this.driver.findElement(LoginView.LOCATORS.emailInput);
            await emailField.sendKeys(email);
            console.log(`이메일 입력 완료: ${email}`);
        } catch (error) {
            throw new Error(`이메일 입력 실패: ${error.message}`);
        }
    }

    /**
     * 비밀번호 입력
     * @param {string} password - 입력할 비밀번호
     */
    async enterPassword(password) {
        try {
            const passwordField = await this.driver.findElement(LoginView.LOCATORS.passwordInput);
            await passwordField.sendKeys(password);
            console.log('비밀번호 입력 완료');
        } catch (error) {
            throw new Error(`비밀번호 입력 실패: ${error.message}`);
        }
    }

    /**
     * 로그인 버튼 클릭
     */
    async clickLoginButton() {
        try {
            const loginButton = await this.driver.findElement(LoginView.LOCATORS.loginButton);
            // 버튼이 활성화될 때까지 대기
            await this.driver.wait(until.elementIsEnabled(loginButton), 5000);
            await loginButton.click();
            console.log('로그인 버튼 클릭 완료');
        } catch (error) {
            throw new Error(`로그인 버튼 클릭 실패: ${error.message}`);
        }
    }
    /**
     * 로그인 수행
     * @param {string} email - 이메일
     * @param {string} password - 비밀번호
     */
    async login(email, password) {
        await this.enterEmail(email);
        await driver.sleep(500); // 입력 간 대기
        await this.enterPassword(password);
        await driver.sleep(500); // 버튼 클릭 전 대기
        await this.clickLoginButton();
    }
}

module.exports = { LoginView };