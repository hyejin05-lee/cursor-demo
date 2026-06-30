/**
 * 멤버 목록에서 이메일 주소만 추출한다.
 * @param {unknown} members - 이메일을 포함한 멤버 객체 배열
 * @returns {string[]} 추출된 이메일 배열
 */
function extractEmails(members) {
  if (!Array.isArray(members)) {
    return [];
  }
  return members.map((member) => member.email);
}

// RFC 5322 addr-spec — emailregex.com 기반, IP 옥텟 선행 0(00) 버그 수정
// https://emailregex.com/index.html
// https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
// Max length per RFC 5321 §4.5.3.1 — https://www.rfc-editor.org/rfc/rfc5321#section-4.5.3.1
const RFC_5322_EMAIL_REGEX =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(?:2(?:5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(?:2(?:5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const MAX_EMAIL_LENGTH = 254;

/**
 * 이메일 형식이 RFC 5322 규격에 맞는지 검사한다.
 * @param {unknown} email - 검사할 이메일
 * @returns {boolean} 유효하면 true
 */
function isValidEmail(email) {
  if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH) return false;
  return RFC_5322_EMAIL_REGEX.test(email);
}

/**
 * 멤버 목록에서 유효한 이메일만 반환한다.
 * @param {Array<{ email?: unknown }>} members - 멤버 객체 배열
 * @returns {string[]} 유효한 이메일 배열
 */
function getValidEmails(members) {
  return extractEmails(members).filter(isValidEmail);
}

/**
 * 이메일 문자열을 정규화한다 (앞뒤 공백 제거, 소문자 변환).
 * @param {unknown} email - 정규화할 이메일
 * @returns {string} 정규화된 이메일. 문자열이 아니면 빈 문자열
 */
function normalizeEmail(email) {
  if (typeof email !== 'string') {
    return '';
  }
  return email.trim().toLowerCase();
}

export { extractEmails, isValidEmail, getValidEmails, normalizeEmail };
