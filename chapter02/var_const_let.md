# const, let

> ES2015 이전에는 var로 변수를 선언했다.

- ES2015부터는 const와 let이 var을 대체한다.
- 가장 큰 차이점: 블록 스코프(var은 함수 스코프)

```javascript
if(true){
    var x = 3;
}
// 블록 안에서 선언한 변수를 블록 밖에서 접근할 수 있다.
// 단, 함수 블록에서 선언한 var 변수는 밖에서 접근할 수 없다.
console.log(x);
```

```javaScript
if(true){
    const y = 3;
}
// 블록 안에서 선언한 변수를 블록 밖에서 접근할 수 없다.
console.log(y); // Uncaught ReferenceError: y is not defined
```

### 정리
- 웬만하면 const, let을 사용하자.
- 일단 모든 것들을 const로 선언하고, 나중에 바꿀일이 있으면 let으로 바꾸자.

