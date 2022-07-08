# Promise

> 콜백 헬이라고 불리는 지저분한 자바스크립트 코드의 해결책이다.

- 프로미스: 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
- Then을 붙이면 결과를 반환한다.
- 실행이 완료되지 않았으면 완료된 후에 Then 내부함수가 실행됨
- 프로미스 내부는 동기적으로 실행되고, 외부(ex: then)는 ㅣ비동기적으로 실행된다.

```javascript
const condition = true;
const promise = new Promise((resolve, reject) => {
    if(condition){
        resolve('성공');
    } else {
        reject('실패');
    }
});

//...//

promise
    .then((message) => {
        console.log(message);   //성공한 경우 실행
    })
    .catch((error) => {
        console.log(error);     //실패한 경우 실행
    })
```

# async/await

- 프로미스의 then의 무한 반복 현상을 축약해서 작성할 수 있다.

### Promise 코드

```javascript
function findAndSaveUser(Users){
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm'});
        })
        .then((user) => {
            // ...
        })
        .catch(err => {
            // ...
        })
}
```

### async/await 코드

- await이 프로미스의 then이라고 생각하면 된다.
- 실행 순서가 오른쪽에서 왼쪽이다.

```javascript
async function findAndSaveUser(Users){
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm'});
    //생략
}
```
