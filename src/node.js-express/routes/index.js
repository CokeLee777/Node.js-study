var express = require('express');
var router = express.Router();
const template = require('../lib/template');

router.get('/', (request, response) => {
    const title = 'Welcome';
    const description = 'Hello, Node.js';
    const list = template.list(request.list);
    const html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin:10px">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);
});

module.exports = router;