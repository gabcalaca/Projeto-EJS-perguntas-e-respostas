const express = require("express");
const app = express();



app.set('view engine','ejs'); //dizendo para o express que a view engine é o ejs







app.get("/",function(req,res){
    res.render("index");
});

app.listen(8181,function(erro){
    if(erro){
        console.log("ocorreu um erro");
    }else{
        console.log("servidor iniciado!");
    }
    
})