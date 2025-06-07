// js/jwt_token.js
const JWT_SECRET = "your_secret_key_here";

function generateJWT(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
  const encodedSignature = CryptoJS.enc.Base64.stringify(signature);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
  const calculatedSignature = CryptoJS.enc.Base64.stringify(signature);
  if (encodedSignature !== calculatedSignature) return null;

  const payload = JSON.parse(atob(encodedPayload));
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

function isAuthenticated() {
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;
  return !!verifyJWT(token);
}

function checkAuth() {
  if (isAuthenticated()) {
    alert("정상적으로 토큰이 검증되었습니다.");
  } else {
    alert("인증되지 않은 접근입니다.");
    window.location.href = 'login.html';
  }
}
