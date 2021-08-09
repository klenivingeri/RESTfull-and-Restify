const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); // recebe o dados em json

consign().include('routes').include('utils').into(app);
//Consign vai incluir a pasta routes e utils dentro do nosso app
//Ele passa o app dentro do modules exportados nas rotas

app.listen(4000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})
















/**
 *  1 ) Carrega o modulo http.
 *  2 ) Oque ela pode pedir(requisições), e oque ela pode receber (Respostas).
 */