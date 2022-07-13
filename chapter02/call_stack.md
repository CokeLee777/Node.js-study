## 호출 스택

> 호출 스택(함수의 호출, 자료구조의 스택)

- Anonymous는 가상의 전역 컨텍스트
    - js 파일이 실행되면 기본적으로 하나가 쌓인다.
- 함수 호출 순서대로 쌓이고, 역순으로 실행된다.
- **함수 실행이 완료되면 스택에서 빠진다.**
- LIFO 구조라서 스택이라고 불린다.

다음 `동기식` 코드가 실행된다고 가정하자.

```javascript
function first(){
    second();
    console.log("첫 번째");
}
function second(){
    third();
    console.log("두 번째");
}
function third(){
    console.log("세 번째");
}
first();
```

이 코드의 호출 스택은 다음과 같이 밑에서부터 쌓이고 위에서부터 실행된다.

|third()|
|:---:|
|second()|
|first()|
|anonymous|

> 실행 순서: third -> second -> first -> anonymous