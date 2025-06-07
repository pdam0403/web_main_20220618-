document.addEventListener('DOMContentLoaded', () => {
    init();

    const check_input = () => {
        const loginForm = document.getElementById('login_form');
        const emailInput = document.getElementById('typeEmail');
        const passwordInput = document.getElementById('typePasswordX');

        alert('아이디, 패스워드를 체크합니다');

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // 유효성 검사
        if (emailValue === '') {
            alert('이메일을 입력하세요.');
            return false;
        }

        if (passwordValue === '') {
            alert('비밀번호를 입력하세요.');
            return false;
        }

        if (emailValue.length < 5 || emailValue.length > 50) {
            alert('이메일은 5~50자 사이로 입력해주세요.');
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            alert('올바른 이메일 형식을 입력하세요.');
            return false;
        }

        if (passwordValue.length < 12 || passwordValue.length > 15) {
            alert('비밀번호는 12~15자 사이로 입력해주세요.');
            return false;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
            return false;
        }

        if (!/[A-Z]/.test(passwordValue) || !/[a-z]/.test(passwordValue)) {
            alert('패스워드는 대소문자를 각각 1개 이상 포함해야 합니다.');
            return false;
        }

        if (/(...).*\1/.test(emailValue) || /(...).*\1/.test(passwordValue)) {
            alert('3글자 이상의 문자열을 반복해서 입력할 수 없습니다.');
            return false;
        }

        if (/(\d{2,}).*\1/.test(emailValue) || /(\d{2,}).*\1/.test(passwordValue)) {
            alert('2자리 이상의 숫자를 반복해서 입력할 수 없습니다.');
            return false;
        }

        // 세션 + 암호화된 비밀번호 저장
        session_set(emailValue, passwordValue);

        // 쿠키 저장 및 로그인 횟수 증가
        saveId();
        login_count();

        // JWT 생성 및 저장
        const payload = {
            id: emailValue,
            exp: Math.floor(Date.now() / 1000) + 3600
        };
        const jwtToken = generateJWT(payload);
        localStorage.setItem('jwt_token', jwtToken);

        loginForm.submit();
    };

    document.getElementById("login_btn").addEventListener('click', (event) => {
        event.preventDefault();
        check_input();
    });
});

// 초기화 함수: 쿠키 기반 이메일 자동입력
function init() {
    const emailInput = document.getElementById('typeEmail');
    const idsave_check = document.getElementById('idSaveCheck');
    const get_id = getCookie("id");

    if (get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
}

// ID 저장
function saveId() {
    const idSaveCheck = document.getElementById('idSaveCheck');
    const emailInput = document.getElementById('typeEmail');

    if (idSaveCheck.checked) {
        setCookie("id", emailInput.value, 1); // 1일 저장
    } else {
        setCookie("id", "", 0); // 삭제
    }
}

// 로그인 횟수 카운트
function login_count() {
    let cnt = parseInt(getCookie("login_cnt") || "0");
    cnt += 1;
    setCookie("login_cnt", cnt, 1);
}

// 로그아웃 횟수 카운트
function logout_count() {
    let cnt = parseInt(getCookie("logout_cnt") || "0");
    cnt += 1;
    setCookie("logout_cnt", cnt, 1);
}

// 쿠키 설정
function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
}

// 쿠키 가져오기
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, val] = cookie.trim().split('=');
        if (key === name) return val;
    }
    return null;
}

// 세션 저장 + 암호화된 패스워드 저장
function session_set(email, password) {
    const key = "key".padEnd(32, " ");
    const encryptedPassword = encodeByAES256(key, password);

    if (sessionStorage) {
        sessionStorage.setItem("Session_Storage_id", email);
        sessionStorage.setItem("Session_Storage_pass", encryptedPassword);
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}

// 세션 삭제
function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('로그아웃: 세션을 삭제합니다.');
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}

// 로그아웃 처리
function logout() {
    session_del();
    logout_count();
    localStorage.removeItem("jwt_token"); // JWT 삭제
    location.href = '../index.html'; // 로그아웃 후 메인 페이지로
}
