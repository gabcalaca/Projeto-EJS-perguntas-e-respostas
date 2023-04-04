const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");


//banco de dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco sucedida');
    })
    .catch(() => {
        console.log(msgErro);
    });





app.set('view engine','ejs'); //dizendo para o express que a view engine é o ejs
app.use(express.static('public'));


//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());






//rotas

app.get("/",function(req,res){

  

    res.render("index");

});



app.get("/perguntar",function(req,res){
    res.render("perguntar");


});

app.post("/receberpergunta",function(req,res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido titulo:"+ titulo + "descrição:" + descricao);
});



app.listen(8181,function(erro){
    if(erro){
        console.log("ocorreu um erro");
    }else{
        console.log("servidor iniciado!");
    }
    
})