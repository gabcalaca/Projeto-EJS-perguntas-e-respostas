const express = require("express");
const app = express();



app.set('view engine','ejs'); //dizendo para o express que a view engine é o ejs







app.get("/:nome/:lang",function(req,res){

    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome:"Costela",preco:30.50},
        {nome:"linguica",preco:29.50},
        {nome:"File",preco:20.50}
    ];
    

    res.render("index",{
        nome: nome,
        lang: lang,
        msg : exibirMsg,
        produtos: produtos


    });

});

app.listen(8181,function(erro){
    if(erro){
        console.log("ocorreu um erro");
    }else{
        console.log("servidor iniciado!");
    }
    
})