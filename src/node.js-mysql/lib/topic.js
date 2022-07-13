const url = require('url');
const db = require('./db');
const template = require('./template');
const sanitizeHtml = require('sanitize-html');

exports.home = function(request, response){
    db.query('SELECT * FROM topic', function(error, topics){
        if(error) throw error;
    
        const { title, description } = topics[0];
        const list = template.list(topics);
        const html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        
        response.writeHead(200);
        response.end(html);
    });
}

exports.page = function(request, response){
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    db.query('SELECT * FROM topic', function(error, topics){
        if(error) throw error;

        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ?`, [queryData.id],function(error2, topic){
          if(error2) throw error2;

          const { title, description, name } = topic[0];
          const list = template.list(topics);
          const html = template.HTML(title, list,
            `<h2>${sanitizeHtml(title)}</h2>
            ${sanitizeHtml(description)}
            by ${sanitizeHtml(name)}`,
            ` <a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
    });
}

exports.create = function(request, response){
    db.query('SELECT * FROM topic', function(error, topics){
        // 에러 처리
        if(error) throw error;

        db.query('SELECT * FROM author', function(error2, authors){
          if(error2) throw error2;

          const title = 'Create';
          const list = template.list(topics);
          const html = template.HTML(sanitizeHtml(title), list,
            `
            <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                ${template.authorSelect(authors)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a>`
          );
          
          response.writeHead(200);
          response.end(html);
        });
    });
}

exports.create_process = function(request, response){
    let body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        const post = new URLSearchParams(body);
        db.query(`INSERT INTO topic (title, description, created, author_id)
            VALUES(?, ?, NOW(), ?)`, 
            [post.get('title'), post.get('description'), post.get('author')],
            function(error, results){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/?id=${results.insertId}`});
              response.end();
            }
        );
    });
}

exports.update = function(request, response){
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error, topics){
        if(error) throw error;

        db.query(`SELECT * FROM topic WHERE id = ?`, [queryData.id], function(error2, topic){
          if(error2) throw error2;

          db.query(`SELECT * FROM author`, function(error3, authors){
            if(error3) throw error3;

            const { id, title, description, author_id } = topic[0];
            const list = template.list(topics);
            const html = template.HTML(sanitizeHtml(title), list, 
              `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${id}">
                <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(title)}"></p>
                <p>
                  <textarea name="description" placeholder="description">${sanitizeHtml(description)}</textarea>
                </p>
                <p>
                  ${template.authorSelect(authors, author_id)}
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update?id=${id}">update</a>`
              );
          
            response.writeHead(200);
            response.end(html);
          });
        });
    });
}

exports.update_process = function(request, response){
    let body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        const post = new URLSearchParams(body);
        db.query(`UPDATE topic SET title = ?, description = ?, author_id = ?
            WHERE id = ?`, 
            [post.get('title'), post.get('description'), post.get('author'), post.get('id')],
            function(error, results){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/?id=${post.get('id')}`});
              response.end();
            }
          );
    });
}

exports.delete_process = function(request, response){
    let body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        const post = new URLSearchParams(body);
        db.query(`DELETE FROM topic WHERE id = ?`, [post.get('id')],
            function(error, results){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/`});
              response.end();
            }
          );
    });
}