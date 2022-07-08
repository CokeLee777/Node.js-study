# 화살표 함수

## 특징

- 본문에 바로 return 문이 나온다면 중괄호, return 키워드 생략가능

```javascript
function add1(x, y){
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
}

const add3 = (x, y) => x + y;
```

```javascript
function not1(x){
    return !x;
}

const not2 = x => !x;
```

- 필요하다면 괄호를 붙여줄 수도 있다.

```javascript
const add4 = (x, y) => (x, y);
```

- 객체 리터럴을 반환하는 화살표 함수인 경우에는 중괄호와 괄호를 같이 붙여줘야 한다.

```javascript
const obj = (x, y) => ({x, y});
```

- 화살표 함수가 기존 function(){}을 대체하는 것은 아니다(this 값이 달라진다)
    - 기존의 function()은 자신만의 this 값을 갖는다.
    - 그러나, 화살표 함수는 자신만의 this는 없고 부모의 this값을 물려받게된다.

예를들면 아래의 코드는 다른 동작을 하는 코드이다.

```javascript
button.addEventListener('click', function(){
    console.log(this.textContent());    //자신의 this값
})

button.addEventListener('click', () => {
    console.log(this.textContent());    //부모의 this값
})
```