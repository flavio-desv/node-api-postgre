// instanciando o Express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());


const pg = require('pg');

var conString = "postgres://postgres:mouse@localhost:5432/geomodelo";

// ==> Conexão com a Base de Dados:

const client = new pg.Client(conString);
client.connect();

//var http = require("http");
//const pg = require('pg');

//var conString = "postgres://postgres:mouse@localhost:5432/geomodelo";

//var client = new pg.Client(conString);
//client.connect();

//var query = client.query("SELECT * FROM categoria");

//client.query("SELECT * FROM categoria", (err, res) => {
//    if (err) throw err
//    console.log(res)
//    client.end()
//  });


// Iniciando o express

const port = 3000;

//const router = express.Router();
//console.log('passou');

app.get('/api/', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL + Azure!',
    version: '1.0.0',
  });
});

// Método Get
getMarca = async (req, res) => {
  
  const response = await client.query(
    
    "SELECT "+
    "  id_marca," +
    "  nm_marca, " +
    "  fg_ativo, " +
    "  extract( epoch from dt_inclusao ) as dt_inclusao, "+
    "  extract( epoch from dt_alteracao ) as dt_alteracao "+
    "FROM " +
    "  marca"
  );
  res.status(200).send(response.rows);

};

updateMarca = async (req, res) => {
  
  console.log('entrou no updateMarca');
  console.log(req.body);
  console.log('nm_marca  '+req.body.nm_marca);
  console.log(" primeiro = $1");
  
  const id_marca = parseInt(req.params.id);
  const { nm_marca, fg_ativo } = req.body;
  console.log(" primeiro = $nm_marca");
  
  var sql = 'UPDATE marca SET '+ 
  '  nm_marca = ${nm_marca},  '+
  '  fg_ativo = ${fg_ativo} '+
  'WHERE '+ 
  '  id_marca = ${id_marca}';
  //const response = await client.query(
  await client.query(

    sql
    


    );
  await client.query('COMMIT');
  
  res.status(200).send({ message: "Product Updated Successfully!" });
};



app.get('/marca/get', getMarca);
app.put('/marca/put/:id', updateMarca);


app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});
  


