# 구조분해 할당

- 객체에서 값을 꺼낼때 보통 이런식으로 꺼내는 경우가 많다.

```javascript
const example = {a: 123, b: {c: 135, d: 146}}
const a = example.a;
const d = example.b.d;
```

- 이렇게 짜면 코드도 길어지고 비효율적인 코딩을 하게되는데
- 이 때, 구조분해 할당 기법을 사용하면 다음과 같이 간단하게 변수에 값을 할당할 수 있다.
- 이런 문법을 구조분해 문법이라고 한다.

```javascript
const example = {a: 123, b: {c: 135, d: 146}}

const {a, b: {d}} = example;
console.log(a); //123
console.log(d); //146
```

- 또한 배열에서도 이런 상황이 나올 수 있다.

```javascript
arr = [1, 2, 3, 4, 5];
const x = arr[0];
const y = arr[1];
const z = arr[4];
```

- 이 때, 구조분해 문법을 사용해서 배열에 있는 값에 변수를 할당하면 다음과 같다.

```javascript
arr = [1, 2, 3, 4, 5];
const[x, y, , , z] = arr;
```

- 단, this를 사용하는 경우에는 구조분해를 하면 문제가 생길 수 있기 떄문에 구조분해를 하지 않는게 좋다.
- 그 이유는 this는 함수를 호출할 때, 어떻게 호출되었냐에 따라서 결정되기 때문이다.

