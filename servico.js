const express = require('express');
const path = require('path');
const server = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const job = require('./config/investimento');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.static(path.join(__dirname, 'views')));

server.set('views engine', 'ejs');

server.use(require('./routes/route'));

server.listen(port, () => {
    console.log("Serviço rodando na porta: " + port)
    job
});