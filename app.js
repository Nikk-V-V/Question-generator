const express = require('express');
const mongoose = require('mongoose');
const config = require("config");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(require('morgan')('dev'));

app.use('/uploads', require('express').static('uploads'));

app.use(express.json({ extended: true }));

app.use(require('cors')());

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/quest', require('./Routes/quests'));
app.use('/api/query', require('./Routes/query'));


const PORT = process.env.port || config.get("port");

async function start() {
    try {
        app.listen(PORT, () => console.log("App has been started on port", PORT));
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();

