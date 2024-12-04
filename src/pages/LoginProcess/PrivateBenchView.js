const { By, until } = require('selenium-webdriver');

class PrivateBenchView {
    constructor(driver) {
        this.driver = driver;
        // 하이퍼 스크리닝 버튼 선택자 업데이트
        this.addMoleculeButton = By.css('button[aria-haspopup="dialog"][class*="bg-blue-600"]');
    }

    async verifyAddMoleculeButtonDisplayed() {
        try {
            // 페이지 로드 대기
            await this.driver.wait(until.elementLocated(By.css('body')), 10000);
            
            // 명시적 대기 시간 (20초)
            await this.driver.wait(until.elementLocated(this.addMoleculeButton), 20000);
            const button = await this.driver.findElement(this.addMoleculeButton);
            
            // JavaScript가 실행될 때까지 대기
            await this.driver.executeScript("return document.readyState === 'complete'");
            
            const isDisplayed = await button.isDisplayed();
            console.log('하이퍼 스크리닝 버튼이 표시됨:', isDisplayed);
            return isDisplayed;
        } catch (error) {
            console.error('하이퍼 스크리닝 버튼을 찾을 수 없음:', error);
            throw error;
        }
    }

    async clickAddMoleculeButton() {
        try {
            // 페이지 로드 대기
            await this.driver.wait(until.elementLocated(By.css('body')), 10000);
            
            // 명시적 대기 시간 (20초)
            await this.driver.wait(until.elementLocated(this.addMoleculeButton), 20000);
            await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.addMoleculeButton)), 20000);
            
            // JavaScript 실행 완료 대기
            await this.driver.executeScript("return document.readyState === 'complete'");
            
            const button = await this.driver.findElement(this.addMoleculeButton);
            
            // 클릭 가능할 때까지 대기
            await this.driver.wait(until.elementIsEnabled(button), 20000);
            
            await button.click();
            console.log('하이퍼 스크리닝 버튼 클릭 성공');
        } catch (error) {
            console.error('하이퍼 스크리닝 버튼 클릭 실패:', error);
            throw error;
        }
    }
}

module.exports = { PrivateBenchView };