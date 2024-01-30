'use strict'

const express = require('express');
const fs = require('fs');
const app = express();

let count = {};
try {
    const data = fs.readFileSync('./counter.json', 'utf8');
    count = JSON.parse(data);
    console.log('Data read from file:', count);
} catch (err) {
    console.error('Error reading file:', err);
}

let countString = '';
app.get('/', (req, res) => {
    count.main++;
    res.send(`<h1>Добро пожаловать на мой сайт!</h1><br>
        <p>Кол-во посещений ${count.main}</p>
        <a href="/about"><h2>Обо мне</h2></a>
        `);
    countString = JSON.stringify(count);
    fs.writeFile('./counter.json', countString, (err) => {
        err ? console.error(err) : console.log('file saved')
    });
});

app.get('/about', (req, res) => {
    count.about++;
    res.send(`<h1>Обо мне</h1><br>
        <p>Кол-во посещений ${count.about}</p>
        <a href="/"><h2>На главную</h2></a>
        `);
    fs.writeFile('./counter.json', countString, (err) => {
        err ? console.error(err) : console.log('file saved')
    });
});

app.use((req, res) => {
    res.status(404);
    res.send(`<h1 style="color: red;">Страница не найдена</h1><br>
        <a href="/"><h2>На главную</h2></a>
        `);
});

app.listen(3000)
