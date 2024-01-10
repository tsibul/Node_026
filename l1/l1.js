const http = require('http');
let mainUrlCount = 0;
let aboutUrlCount = 0;
let errorUrlCount = 0;
const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        mainUrlCount = mainUrlCount + 1;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Добро пожаловать на мой сайт!</h1><br>
        <p>Кол-во посещений ${mainUrlCount}</p>
        <a href="/about">About</a>
        `);
    } else if (req.url === '/about') {
        aboutUrlCount++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Обо мне</h1><br>
        <p> Кол-во  посещений ${aboutUrlCount}</p>
        <a href="/">На главную</a>
        `);
    } else {
        errorUrlCount++;
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Страница не найдена!</h1><br>
        <p> Кол-во  посещений ${errorUrlCount}</p>
        <a href="/">На главную</a>
        `);
    }
});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});