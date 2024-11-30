// Login.js 파일 실행을 위한 import
const { executeLogin } = require('./Login.js');

(async function runTests() {
    try {
        // Login.js 실행
        console.log('\n=== 로그인 프로세스 시작 ===');
        await executeLogin();
        console.log('=== 로그인 프로세스 완료 ===\n');

    } catch (error) {
        console.error('테스트 실패:', error);
        throw error;
    }
})();