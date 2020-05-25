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

// Iniciando o express

const port = 3000;

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
  
  const id_marca = parseInt(req.params.id);
  const { nm_marca, fg_ativo } = req.body;
 
  const response = await client.query(
    "UPDATE marca SET nm_marca = $1, fg_ativo = $2 WHERE id_marca = $3",
    [nm_marca, fg_ativo, id_marca]
  );
  
  res.status(200).send({ message: "Product Updated Successfully!" });
};



app.get('/marca/get', getMarca);
app.put('/marca/put/:id', updateMarca);


app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});
  


