const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express')
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const template = require('./lib/template');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));  //body parser 사용
app.use(compression()); //압축 기능 미들웨어 사용 -> 데이터가 많을 경우 압축한다.
app.use(express.static('public'));  //정적 파일 미들웨어 사용

//커스텀 미들웨어 사용, app.use, app.get, app.post 다 사용가능
//파일읽기 기능
app.get('*', (request, response, next) => {
  fs.readdir('./data', function(error, filelist){
    if(error) throw error;

    request.list = filelist;  //request 객체에 list값을 셋팅
    next(); // 그 다음에 호출되어야 할 미들웨어를 실행
  });
});

// route, routing
app.get('/', (request, response) => {
  const title = 'Welcome';
  const description = 'Hello, Node.js';
  const list = template.list(request.list);
  const html = template.HTML(title, list,
    `<h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:300px; display:block; margin:10px">
    `,
    `<a href="/create">create</a>`
  );
  response.send(html);
});

app.get('/page/:pageId', (request, response, next) => {
    const filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      if(err){
        next(err);
      } else {
        const title = request.params.pageId;
        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedDescription = sanitizeHtml(description, {
          allowedTags:['h1']
        });
        const list = template.list(request.list);
        const html = template.HTML(sanitizedTitle, list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/create">create</a>
            <a href="/update/${sanitizedTitle}">update</a>
            <form action="/delete/${filteredId}" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`
        );
        response.send(html);
      }
    });
});

app.get('/create', (request, response) => {
  const title = 'WEB - create';
  const list = template.list(request.list);
  const html = template.HTML(title, list, `
    <form action="/create" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
  response.send(html);
});

app.post('/create', (request, response) => {
  const body = request.body;
  const title = body.title;
  const description = body.description;
  fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
    response.redirect('/');
  });
});

app.get('/update/:pageId', (request, response) => {
  const filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    const title = request.params.pageId;
    const list = template.list(request.list);
    const html = template.HTML(title, list,
      `
      <form action="/update/${filteredId}" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/create">create</a> <a href="/update/${title}">update</a>`
    );
    response.send(html);
  });
});

app.post('/update/:pageId', (request, response) => {
  const body = request.body;
  const id = body.id;
  const title = body.title;
  const description = body.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/page/${title}`);
    });
  });
});

app.post('/delete/:pageId', (request, response) => {
  const body = request.body;
  const id = body.id;
  const filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/', 302);
  });
});

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
