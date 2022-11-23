const express = require('express');
const app =  express();

const rotasProdutos = require('./routes/produtos');

app.use('/produtos', rotasProdutos);


module.exports = app;