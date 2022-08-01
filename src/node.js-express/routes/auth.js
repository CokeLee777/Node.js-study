var express = require('express');
var router = express.Router();
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const template = require('../lib/template');

const authData = {
  email: 'user123@gmail.com',
  password: '111111',
  nickname: 'lee' 
}

router.get('/login', (request, response) => {
  const title = 'WEB - login';
  const list = template.list(request.list);
  const html = template.HTML(title, list, `
    <form action="/auth/login" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  response.send(html);
});

  
router.post('/login', (request, response) => {
  const body = request.body;
  const email = body.email;
  const password = body.pwd;
  if(email === authData.email && password === authData.password){
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    request.session.save(function(){
      response.redirect(`/`);
    });
  } else {
    response.send('Who?');
  }
});

router.get('/logout', (request, response) => {
  request.session.destroy(function(err){
    if(err){
      console.error(err);
    } else {
      response.redirect('/');
    }
  });
});

module.exports = router;