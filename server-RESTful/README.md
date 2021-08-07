# NodeJS 
## - JavaScript no Back-End, Routes e Banco de dados.
Precisa do nodejs instalado e saber usar npm para instalação de pacotes
- Express
- Consign
- Body-parser
- Express-Validador
- Nedb
- Postman
 
## Iniciando servidor
`node index` - Depois de criar o arquivo index.js.
~~~Javascript
//index.js
const http = require('http'); // 1 Carrega o modulo http

// 2 Oque ela pode pedir(requisições), e oque ela pode receber (Respostas).
http.createServer((req, res) => { 
  console.log('URL:', req.url); 
  // retorna barra /
  console.log('Method:', req.method); 
  // retorna por padrão o method GET

  res.end('OK') // responde a requisição.
  // Se não houver retorno da requisição, vai ficar aguardando infinitamente.

})

server.listen(3000, '127.0.0.1', () => { 
// a porta que voce quer subir 3000, e o IP.

  console.log('Servidor rodando')
  
})

~~~

## Identificando camadas
 Coloquei o Switch mas pode ser qualquer outro condicional para identificar as rotas.
~~~Javascript

const http = require('http');

let server = http.createServer((req, res) => { 

  console.log('URL:', req.url);
  console.log('Method:', req.method);

  switch (req.url) { // Passamos um retorno dependendo da rota chamada
    case '/':
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Olá </h1>');
      break;

      case '/users':
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        users:[{
          name:'Hcode',
          email:'contato@hcide.com.br',
          id: 1
        },{
          name:'Erick',
          email:'kleniving@hcide.com.br',
          id: 2
        }]
      }));
      break;
  
    default:
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1> Não é uma rota esperada</h1>');
      break;
  }

})

server.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})

// http://localhost:3000/
// Olá
// http://localhost:3000/users
// JSON
// http://localhost:3000/rotaNaoEsperada
// Não é uma rota esperada
~~~

## Iniciando Package.json
 - `npm init` - Inicia o package.json. 
 - Package contem todas as informações necessarias para o projeto rodar.
 - `npm install express --save` - Instala o express como dependencia do projeto --save.
 - `npm install nodemon -g` - Instala o nodemon apenas na sua maquina -g,
 - executamos o servidor com `nodemon index`.

## Criando servidor com Express.
Utilizamos o pacote express para ajudar na criação do servidor.
Para configurar um servidor do zero, precisamos acertar varios detalhes,
mas o express já vem com tudo  configurado.

Não preciamos mais do switch, e podemos configurar as rotas por requisições  apartir do app.
 - GET : O método GET solicita a representação de um recurso específico. Requisições utilizando o método GET devem retornar apenas dados.
 - POST : O método POST é utilizado para submeter uma entidade a um recurso específico, frequentemente causando uma mudança no estado do recurso ou efeitos colaterais no servidor.
 - PUT : O método PUT substitui todas as atuais representações do recurso de destino pela carga de dados da requisição.
 - DELETE : O método DELETE remove um recurso específico.

 Existem outros metodos que podem ser visto [aqui](
 https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)

~~~Javascript
const express = require('express');
const app = express()

// Não preciamos mais do Switch, agora vamos usar app.get, app.post...
app.get('/', (req, res) => { 

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Olá </h1>');

})

app.get('/users', (req, res) => { 
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({
    users:[{
      name:'Hcode',
      email:'contato@hcide.com.br',
      id: 1
    },{
      name:'Erick',
      email:'kleniving@hcide.com.br',
      id: 2
    }]
  });

})

app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})
~~~

## Dividindo rotas em arquivos
Não é uma boa pratica deixar todo o codigo em apenas um arquivo, nossa aplicação pode evoluindo e deixando dificil o entendimento com tudo no mesmo lugar.
Uma boa pratica é fracionar nosso codigo, vamos criar modulos que vão trabalhar separadamente.

 - Criar uma nova pasta /routes com o arquivo index.js e users.js
~~~Javascript 
 // routes/index
const express = require('express');
let routes = express.Router(); // Chamamos as rotas

routes.get('/', (req, res) => {  // passamos a rota /

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Olá </h1>');

})

module.exports = routes;
~~~

~~~Javascript 
 // routes/users
let express = require('express');
let routes =  express.Router(); // Chamamos as rotas

routes.get('/users', (req, res) => {  // passamos a rota /users
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({
    users:[{
      name:'Hcode',
      email:'contato@hcide.com.br',
      id: 1
    },{
      name:'Erick',
      email:'kleniving@hcide.com.br',
      id: 2
    }]
  });

})

module.exports = routes;
~~~

Depois do arquivos criados vamos inclui-los no nosso index.
~~~javascript 
// raiz index

const express = require('express');
let routesIndex = require('./routes/index'); // aqui
let routesUsers = require('./routes/users'); // aqui

const app = express();

// E passar aqui para nosso app
app.use(routesIndex); 
app.use(routesUsers); 

app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})

~~~

## Consign
`npm install consign --save` - Instala o consign como dependencia do projeto --save.
 Ajudar a incluir arquivos no nosso app

Vamos melhorar ainda mais o codigo acima usando o consign.

~~~javascript 
// raiz index
const express = require('express');
const consign = require('consign');

const app = express();
consign().include('routes').into(app);
//Consign vai incluir a pasta routes dentro do nosso app
//Vamos conseguir acessar nossas rotas atraves do app em outros arquivos.

  app.listen(3000, '127.0.0.1', () => {
    console.log('Servidor rodando')
  });

// http://localhost:3000
// http://localhost:3000/users/

  
~~~

Em vez de exportar o modulo apenas, vamos passar uma função pra ele que recebe o app, dessa forma conseguimos ter acesso total as nossas rotas.
~~~Javascript 
 // routes/index

module.exports = (app) =>{ //recebe o app
  app.get('/', (req, res) => { 

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Olá </h1>');
  
  })

}

module.exports = routes;
~~~
Vamos criar uma nova rota dentro de users.js, a /users/admin, que futuramente será uma rota com requisição POST.
~~~Javascript 
 // routes/users
module.exports = (app) => {
  app.get('/users', (req, res) => { 

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json({
      users:[{
        name:'Hcode',
        email:'contato@hcide.com.br',
        id: 1
      },{
        name:'Erick',
        email:'kleniving@hcide.com.br',
        id: 2
      }]
    });
  
  })
  // nova rota adicionada
  app.get('/users/admin', (req, res) => { 
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json({
      users:[{
        name:'Erick',
        email:'kleniving@hcide.com.br',
        id: 2
      }]
    });
  
  })
};

module.exports = routes;
~~~

## Post
#### Body-parser 
`npm install body-parser --save` - Adiciona como dependencia do projeto -save.
Body-parse vai nos auxilixar a transformar nossos dados de req.body em json.
 -  Vamos passar para dentro do nosso app o bodyParse

~~~Javascript
// raiz index
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser'); // recebemos aqui

const app = express();

// passando para app
app.use(bodyParser.urlencoded({ extended:false })); // passando para o app
app.use(bodyParser.json()); // passando para o app

consign().include('routes').include('utils').into(app);
//Consign vai incluir a pasta routes e utils dentro do nosso app
//Ele passa o app dentro do modules exportados nas rotas

app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})

~~~

Vamos Alterar nossa rota users/admin para /users trocando o method para POST.

~~~Javascript
// Routes/users

//app.get('/users/admin', (req, res) => { 
 app.post('/users', (req, res) => { 
    
    res.json(req.body);
  
  })

// vamos ter duas rotas, com o mesmo nome, porem com solicitações diferentes, uma get e outra post
~~~



## Banco de Dados
`npm install nedb --save` é um banco de dados leve e simples de se trabalhar.

Apartir de agora todas as requisições vão ser feitas utilizando o app do postman e não mais o navegador.

 - Vamos criar nosso banco
 ~~~Javascript 
  // routes/users
  let NeDB = require('nedb');
  let db = new NeDB({
    filename: 'users.bd',
    autoload:true,
})
 ~~~

 - Solicitando informações do banco de dados
#### GET - find
~~~Javascript
module.exports = (app) => {
  
  app.get('/users', (req, res) => { // Chamada da rota via GET , padrão
  
    db.find({}).sort({name:-1}).exec((err, users) =>{  // retonar os dados do banco
    //find: passamos quem queremos buscar, sort:a forma que é listado.
      if (err){
        console.log(`Error: ${err}`);
        res.status(400).json({
          error: err
        })
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users
        });
      }
      
    })

  }) // GET
~~~

 -  Inserindo informações no banco de dados.
 #### POST - insert
~~~Javascript
  app.post('/users', (req, res) => { // Chamada da rota via post
      
    db.insert(req.body, (err, user) =>{ //inserindo os dados no bd
      if (err){
        console.log(`Error: ${err}`);
        res.status(400).json({
          error: err
        })
      } else {
        res.status(200).json(user);
      }

    });
  
  }); // POST
};
~~~

## Refatorando
Nas nossas rotas temos a informação de erro sendo repetida varias vezes.
 - Criar uma pasta utils/error.js
 - Exportar como modulo.

~~~Javascript 
 // utils/error.js
module.exports ={
  send: (err, req, res, code = 400) => {
    console.log(`Error: ${err}`);
    res.status(400).json({
      error: err
    });

  }
};
~~~

 - Utilizar o consign novamente para incluir dentro do nosso app a pasta utils.
~~~Javascript
// raiz index
//de consign().include('routes').into(app); para
consign().include('routes').include('utils').into(app);
//Consign vai incluir a pasta routes e utils dentro do nosso app
~~~

~~~Javascript
// routes/user
module.exports = (app) => {
  app.get('/users', (req, res) => { 
  
    db.find({}).sort({name:-1}).exec((err, users) =>{

      if (err){// Vamos alterar nosso codigo de erro para o method send que criamos
        app.utils.error.send(err, req, res);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users
        });
      }
      
    })

  }) // GET
~~~

### Melhorando ainda mais nossas rotas

 - Vamos criar uma variavel para armazenar nossa rota e diminuir ainda mais nosso codigo

Atualmente estamos com o arquivo users.js dessa forma
~~~Javascript
/let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.bd',
    autoload:true,
})
module.exports = (app) => {

  //Variavel que recebe nossas rota
  let router = app.route('/users');

// de app.get('/users', (req, res) => {  para 
  router.get((req, res) => { 
  
    db.find({}).sort({name:-1}).exec((err, users) =>{
    //find: passamos quem queremos buscar, sort:a forma que é listado.
      if (err){
       app.utils.error.send(err, req, res);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users
        });
      }
      
    })

  }) // GET

// de app.post('/users', (req, res) => {  para 
  router.post((req, res) => { 
    
    db.insert(req.body, (err, user) =>{ // armazena nosso codigo no bd
      if (err){
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }

    });
  
  }); // POST
};
~~~

### Criando nova rota para recuperar um arquivo especifico
#### GET - findOne
~~~Javascript
  // routes/users.js
  let routerId = app.route('/users/:id');

  routerId.get((req, res) => {

    db.findOne({_id:req.params.id}).exec((err, user) =>{
      if(err){
        app.utils.error.send(err, req, res);
      } else{
         res.status(200).json(user);
      }
    });

  });
};
//Exemplo de como chamar a rota
//http://localhost:3000/users/informar-id-aqui
~~~

#### PUT - update
~~~Javascript
  // routes/users
  routerId.put((req, res) =>{

    db.update({_id:req.params.id}, req.body, err =>{

      if (err){
        app.utils.error.send(err, req, res);
      } else{
        res.status(200).json(Object.assign(req.params, req.body));
      }
    })

  })

~~~

#### DELETE - remove
~~~javascript
// routes/users.js
  routerId.delete((req, res)=>{

    db.remove({_id: req.params.id}, {}, err =>{
      if(err){
        app.utils.error.send(err, req, res);
      }else{
        res.status(200).json(req.params)
      }
    })

  })
~~~

## Express-validator
`npm install express-validator --save` - Auxilia na validação de dados.

~~~Javascript
 // raiz
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); 


consign().include('routes').include('utils').into(app);


app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})
~~~

Um dos method que ele incluir é o check() e validationResult() dentro do req;
~~~Javascript
    router.post(
      [
        check("name", "O nome é obrigatório.").notEmpty(),
        check("email", "Email inválido.").notEmpty().isEmail(),
        check("senha", "A senha é obrigatória.").notEmpty(),
      ],
      (req, res) => {
        let errors = validationResult(req);
   
        if (!errors.isEmpty()) { // retorna array ou null
          app.utils.error.send(errors, req, res);
          return false;
        }
   
        db.insert(req.body, (err, user) => {
          if (err) {
            app.utils.error.send(err, req, res);
          } else {
            res.status(200).json(user);
          }
        });
      }
    ); // POST

