# HTML 프로젝트 - 깃허브
새로운 시작! 웹 서비스 개발의 세계로 떠나보아요~
## Getting Started
This project is a starting point for a Web application.
- [프로젝트 메인 주소](https://github.com/pdam0403/web_main_20220618/blob/main/index.html)
## 2주차 수업 메인화면 개발 완료! (문제 포함)
## 3주차 수업 부트스트랩 적용 완료! (문제 제외)
## 4주차 수업 자바스크립트 소개 및 기본 사용, Bootstrap과 연계한 웹 UI 구현
1.    웹 기술 트렌드
정적 웹의 한계 → 동적 웹으로 전환

JS의 역할 확대 + 표준화 (ECMAScript 5, 6 도입)

V8 엔진(JIT 컴파일러)의 등장 → 성능 개선

jQuery → 표준 JS로 변화하는 추세

2. LOL 웹사이트 부트스트랩 활용
  네비게이션 바 구성
상단 좌측에 로고(이미지 + 텍스트) 삽입

<div class="container-fluid"> 내부에 구성

메뉴 항목에 링크 추가, 드롭다운 메뉴 구현

3. 메인 이미지 반응형 처리
큰 이미지에 class="img-fluid" 적용 → 반응형 동작

웹 브라우저 크기 변경에 따른 자동 조절 확인

4. 테이블 꾸미기
하단 테이블에 class="table" 적용

<thead>, <th> 활용하여 구조적 테이블 구성

Bootstrap의 테이블 색상 테마 활용 가능

자바스크립트 기본 사용
  JS 파일 연동
js/basic_js_test.js 파일 생성

<script src="js/basic_js_test.js">로 HTML에 연결

변수 선언 방식
var: 범위 문제 있음 (재선언 가능)

let: 블록 스코프, 중복 선언 불가

const: 상수 선언, 재할당 불가

5. 검색창 구현 실습
🔸 HTML 검색창 구성

<button class="btn btn-outline-success" id="search_btn" type="submit">검색</button>
 JS 이벤트 처리 방식

document.getElementById("search_btn").addEventListener('click', search_message);
function search_message() {
  alert("검색을 수행합니다!");
}
getElementById: 특정 요소 선택

addEventListener: 클릭 이벤트 연결

alert: 사용자 알림 출력
