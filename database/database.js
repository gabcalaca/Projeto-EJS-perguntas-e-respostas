const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','12042005',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;