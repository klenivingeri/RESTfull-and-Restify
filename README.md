# Client server e server RESTApi

 - client-server:  Todos os arquivos relacionados ao fron-end (Essa estrutura de pasta foi criada utilizado express generator)
 - server-RESTful:  Todos os arquivos relacionado ao back-end

### Iniciando client-server:
 - Executar no console `npm start`
 - Vai abrir na rota : localhost:3000
### Iniciando server-RESTApi:
 - Executar no console `nodemon index`
- Vai abrir na rota : localhost:4000


### Pacote utilizados
 - `npm install restify-clients@3.1.0 --save`




### Client-server
#### Restify-clients
Conectando o Client-server com Server-restApi usando restify, [ler mais...](http://restify.com/docs/home/)
~~~javascript
 // routes/user.js

var express = require('express');
var assert = require('assert')
var restify = require("restify-clients") 
var router = express.Router();

var client = restify.createJsonClient({
  url: 'http://localhost:4000/'
});

/* GET users listing. */
router.get('/', function(req, res, next) {

  client.get('/users',(err, request, response, obj) =>{
    assert.ifError(err);

    res.end(JSON.stringify(obj, null,2));

  })

});

module.exports = router;

~~~
#### XMLHttpRequest
[ler mais...](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHTTPRequest)
~~~javascript
// public/controllers/UserController.js, function selectAll()
selectAll(){
  

  let ajax = new XMLHttpRequest();
  ajax.open('GET', '/users');// Passa o method e a rota que vai ser chamada
  ajax.onload = event =>{ //     
    let obj = {users: [] }// declarando uma variavel vazia para receber forEach
    try{
      obj = JSON.parse(ajax.responseText)
    } catch(e){
      console.error(e)
    }

    obj.users.forEach( dataUser =>{
      let user = new User();
      user.loadFromJSON(dataUser);
      this.addLine(user);
    })

  };

  ajax.send();
}
~~~
~~~javascript
~~~

### Server-restApi