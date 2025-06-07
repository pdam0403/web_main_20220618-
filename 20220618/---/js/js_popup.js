// 쿠키 설정 함수
function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
}

// 팝업 닫기 및 쿠키 설정 함수
function closePopup() {
    const checkbox = document.getElementById("check_popup");
    if (checkbox.checked) {
        setCookie("popupClosed", "yes", 1);  // 하루 동안 닫기
    }
    window.close();  // 팝업 닫기
}

// 시계 함수 (선택 사항)
function show_clock() {
    const now = new Date();
    document.getElementById("divClock").innerText = now.toLocaleTimeString();
    setTimeout(show_clock, 1000);
}
