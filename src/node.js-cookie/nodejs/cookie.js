const http = require('http');
const cookie = require('cookie');

http.createServer(function(request, response){
    let cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies);
    response.writeHead(200, {
        'Set-Cookie': [
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookie; Max_Age=${60*60*24*30}`,
            `Secure=Secure; Secure`,
            `HttpOnly=HttpOnly; HttpOnly`,   //javascript를 통해서 접근하지 못하도록 함
            `Path=Path; Path=/cookie`,       // 어떤 경로에서만 쿠키를 저장할것인가를 제어
            `Domain=Domain; Domain=o2.org`   // 어떤 도메인에서 동작할 것인가를 제어
        ]
    });
    response.end('Cookie!!');
}).listen(3000);