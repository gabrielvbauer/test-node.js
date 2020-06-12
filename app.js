const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const path = require("path");
const mysql = require('mysql')

app.listen(5000, () => {
    console.log("Servidor rodando");
});

//Body Parser
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: false,
    })
);
app.use(express.static(path.join(__dirname, "public")));


//Conexão com o banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
})

db.connect(function(err) {
    if (err) {
        console.log('Não foi possível conectar com o banco')
    }
})

app.get("/", function(req, res) {
    let query = db.query("SELECT * FROM clientes", function(err, results) {
        res.render("index", {
            lista: results
        });
    })
});

app.get('/registrar', function(req, res) {
    res.render('cadastro', {})
})

app.post('/registrar', function(req, res) {
    console.log("Cadastro realizado com sucesso")
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let empresa = req.body.empresa;
    db.query('INSERT INTO clientes (nome,sobrenome,empresa) VALUES (?,?,?)', [nome, sobrenome, empresa], function(err, results) {})
    res.render('cadastro', {})
})