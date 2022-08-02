const express = require('express');
const router = express.Router();
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const template = require('../lib/template');

module.exports = function(passport){
  router.get('/login', (request, response) => {
    const fmsg = request.flash();
    let feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
    const title = 'WEB - login';
    const list = template.list(request.list);
    const html = template.HTML(title, list, `
      <div style="color:red;">${feedback}</div>
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
  
  // local: username, password를 이용해서 로그인하는 전략
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    successFlash: true
  }));
  
  router.get('/logout', (request, response) => {
    request.logout(function(err){
      if(err) console.log(err);
      response.redirect('/');
    })
  });
  return router;
}

