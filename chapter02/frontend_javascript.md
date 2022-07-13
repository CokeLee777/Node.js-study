## AJAX

### 서버로 요청을 보내는 코드

- 라이브러리 없이는 브라우저가 지원하는 XMLHttpRequest 객체 이용
- AJAX 요청시 Axios 라이브러리를 사용하는 것이 편함
- HTML에 아래 스크립트를 추가하면 사용할 수 있다.

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    // 코드 작성
</script>
```

#### GET 요청 보내기

- axios.get 함수의 인수로 요청을 보낼 주소를 넣으면 됨
- 프로미스(Promise) 기반 코드라 async/await 사용 가능

```javascript
axios.get("https://www.zerocho.com/api/get")
    .then((result) => {
        console.log(result);
        console.log(result.data);
    })
    .catch((error) => {
        console.log(error);
    });
```

```javascript
(async () => {
    try{
        const result = await axios.get("https://www.zerocho.com/api/get");
        console.log(result);
        console.log(result.data);
    } catch (error){
        console.log(error);
    }
})
```

#### POST 요청 보내기

```javascript
(async () => {
    try{
        const result = await axios.post("https://www.zerocho.com/api/post/json", {
            name: 'zerocho',
            birth: 1994
        });
        console.log(result);
        console.log(result.data);
    } catch (error){
        console.log(error);
    }
})
```

## FormData

- HTML form 태그에 담긴 데이터를 AJAX 요청으로 보내고 싶은 경우
- FormData 메서드
    - Append로 데이터를 하나씩 추가
    - Has로 데이터 존재 여부 확인
    - Get으로 데이터 조회
    - getAll로 데이터 모두 조회
    - delete로 데이터 삭제
    - set으로 데이터 수정

#### FormData POST 요청으로 보내기

- Axios의 data 자리에 formData를 넣어서 보내면 된다.

```javascript
(async () => {
    try{
        const formData = new FormData();
        formData.append('name', 'zerocho');
        formData.append('birth', 1994);
        const result = await axios.post("https://www.zerocho.com/api/post/formdata", formData);
        console.log(result);
        console.log(result.data);
    } catch (error){
        console.log(error);
    }
})
```