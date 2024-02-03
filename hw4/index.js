'use strict'

const express = require("express");
const fs = require("fs");
const {validateUsers} = require("./joi");
const e = require("express");

const app = express();

let users;
const userData = fs.readFileSync('./users.json');
if (userData) {
    users = JSON.parse(userData);
} else {
    users = {};
}
let maxId = users.reduce((max, user) => max < user.id ? user.id : max, 0);

app.use(express.json());

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.post('/users', (req, res) => {
    validateUsers(req.body, res);
    if (res.statusCode !== 404) {
        maxId++;
        users.push({
            id: maxId,
            ...req.body
        });
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
        res.send({
            id: maxId,
        });
    }
});


app.put('/users/:id', (req, res) => {
    validateUsers(req.body, res);
    if (res.statusCode !== 404) {
        let user = users.find((user) => user.id === Number(req.params.id));

        if (user) {
            user.firstName = req.body.name;
            user.lastName = req.body.surName;
            user.age = req.body.age;
            user.city = req.body.mail;
            fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
            res.send({user});
        } else {
            res.status(404);
            res.send({user: null});
        }
    }
});

app.delete('/users/:id', (req, res) => {
    let user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});


app.listen(3100);

