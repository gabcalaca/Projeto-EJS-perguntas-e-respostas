const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");
const resposta = require("./database/Resposta");


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

app.get("/",function(req,res){  //rota da pagina principal
    perguntaModel.findAll({raw: true, order:[
        ['id','desc']
    ]}).then(function(perguntas){
        res.render("index",{
            perguntas: perguntas
        });

    });
  

    

});



app.get("/perguntar",function(req,res){
    res.render("perguntar");


});

app.post("/receberpergunta",function(req,res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(function(){
        res.redirect('/');
    });
});


app.post("/responder",function(req,res){
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(function(){
        res.redirect("/pergunta/"+perguntaId);
    });
});



app.get("/pergunta/:id",function(req,res){
    var id = req.params.id;
    perguntaModel.findOne({
        where: {id :id}
    }).then(function(pergunta){
        if(pergunta != undefined){

            resposta.findAll({
                where: {perguntaId:pergunta.id},
                order: [ 
                    ['id','DESC']
                ]
            }).then(function(respostas){
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

            
        }else{
            res.redirect("/");
        };
    });

});



app.listen(8181,function(erro){
    if(erro){
        console.log("ocorreu um erro");
    }else{
        console.log("servidor iniciado!");
    }
    
});