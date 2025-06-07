import { encrypt_text, decrypt_text } from './crypto.js';

export async function session_set() {
  let id = document.querySelector("#typeEmailX");
  let password = document.querySelector("#typePasswordX");
  let random = new Date();
  const obj = {
    id: id.value,
    otp: random
  };

  if (sessionStorage) {
    const objString = JSON.stringify(obj);
    let en_text = await encrypt_text(objString);
    sessionStorage.setItem("Session_Storage_id", id.value);
    sessionStorage.setItem("Session_Storage_object", objString);
    sessionStorage.setItem("Session_Storage_pass", en_text);
  } else {
    alert("세션 스토리지를 지원하지 않습니다.");
  }
}

export function session_get() {
  if (sessionStorage) {
    return sessionStorage.getItem("Session_Storage_id");
  } else {
    alert("세션 스토리지를 지원하지 않습니다.");
  }
}

export async function session_set2(signUpObj) {
  const userObj = signUpObj.getUserInfo();
  const jsonString = JSON.stringify(userObj);
  const encrypted = await encrypt_text(jsonString);

  if (sessionStorage) {
    sessionStorage.setItem("Session_Storage_join", encrypted);
    console.log("회원가입 정보 암호화 저장 완료:", encrypted);
  } else {
    alert("세션 스토리지를 지원하지 않습니다.");
  }
}

export function session_get_decrypted() {
  const encrypted = sessionStorage.getItem("Session_Storage_join");
  if (!encrypted) return null;

  const decrypted = decrypt_text(encrypted);
  try {
    return JSON.parse(decrypted);
  } catch (e) {
    console.error("복호화 실패 또는 JSON 파싱 실패:", e);
    return null;
  }
}
