# cursor-demo

멤버 목록에서 이메일을 추출·검증·정규화하는 유틸리티 모듈입니다.

## 사용법

```bash
npm test
```

## 릴리스 노트

### v1.0.0

**이메일 추출·검증·정규화 유틸리티와 테스트 스위트를 추가했습니다.**

#### ✨ 기능

- 멤버 목록에서 이메일 주소를 추출하는 `extractEmails` 추가
- RFC 5322 규격 기반 이메일 유효성 검사 `isValidEmail` 추가 (최대 254자 제한)
- 유효한 이메일만 필터링하는 `getValidEmails` 추가
- 이메일 정규화 `normalizeEmail` 추가 (공백 제거, 소문자 변환)
- `node:test` 기반 단위 테스트 추가 (`src/email.test.js`)
- 프로젝트를 ES Modules(`"type": "module"`)로 전환

#### 🐛 버그 수정

- `src/index.js`에서 `console.log`가 문자열 리터럴로만 존재하던 문제 수정 — 실제로 실행되도록 변경

#### 🧹 기타

- `package.json` 테스트 스크립트를 `node --test src/email.test.js`로 설정
- Cursor 개발 환경 설정 추가 (`.cursor/` — rules, skills, commands)
