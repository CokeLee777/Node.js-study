const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use(helmet());  //helmet 사용
app.use(bodyParser.urlencoded({ extended: false }));  //body parser 사용
app.use(compression()); //압축 기능 미들웨어 사용 -> 데이터가 많을 경우 압축한다.
app.use(express.static('public'));  //정적 파일 미들웨어 사용

app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

//커스텀 미들웨어 사용, app.use, app.get, app.post 다 사용가능
//파일읽기 기능
app.get('*', (request, response, next) => {
  fs.readdir('./data', function(error, filelist){
    if(error) throw error;

    request.list = filelist;  //request 객체에 list값을 셋팅
    next(); // 그 다음에 호출되어야 할 미들웨어를 실행
  });
});



app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

// 에러처리
app.use((request, response) => {
  response.status(404).send('Sorry cant find that!');
});

app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');
// var template = require('./lib/template.js');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if(pathname === '/'){
//       if(queryData.id === undefined){

//       } else {

//       }
//     } else if(pathname === '/create'){

//     } else if(pathname === '/create_process'){

//     } else if(pathname === '/update'){

//     } else if(pathname === '/update_process'){

//     } else if(pathname === '/delete_process'){

//     } else {
//       response.writeHead(404);
//       response.end('Not found');
//     }
// });
// app.listen(3000);
