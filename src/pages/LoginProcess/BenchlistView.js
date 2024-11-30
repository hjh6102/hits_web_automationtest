const { By, until } = require('selenium-webdriver');
const assert = require('assert');

class BenchlistView {
    static TIMEOUT = 5000;

    constructor(driver) {
        this.driver = driver;
    }

    static LOCATORS = {
        otpInputs: By.css('input[aria-label$="field"]'),  // 모든 OTP 입력 필드 선택
    };

    async enterVerify(verify) {
        try {
            const verifyField = await this.driver.findElement(BenchlistView.LOCATORS.otpInputs);
            await verifyField.sendKeys(verify);
            console.log(`인증번호 입력 완료: ${verify}`);
        } catch (error) {
            throw new Error(`인증번호 입력 실패: ${error.message}`);
        }
    }
}

module.exports = { BenchlistView };
