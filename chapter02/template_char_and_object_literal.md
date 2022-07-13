# 템플릿 문자열

### 예전 방식

```javascript
const won = 1000;
const result = '이 과자는 ' + won + '원 입니다.';
```

### 최신 방식

- 변수

```javascript
const won = 1000;
const result = `이 과자는 ${won}원 입니다.`;
```

- 함수

```javascript
function a(){}
// 함수 호출의 두 가지 방법
a();
a``;
```