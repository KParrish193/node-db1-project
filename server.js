const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    db.select("*")
        .from(accounts)
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "there was an error with this request" });
        });
});

server.get("/:id", (req, res) =>{
    getById(req.params.id)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "there was an error with this request" });
    });
});

server.post("/", (req, res) => {
    db("accounts")
        .insert(req.body, "id")
        .then(ids => {      
            return getById(ids[0])
                .then(inserted => {
                res.status(201).json(inserted);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "there was an error with this request" });
        });
})

server.put("/:id", (req, res) =>{
    const id  = req.params.id;
    const changes = req.body;

    db("accounts")
        .where({ id })
        .update(changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "there was an error with this request" });
        });
})

server.delete("/:id", (req, res) =>{
    const id  = req.params.id;

    db("accounts")
        .where({ id })
        .del()
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "there was an error with this request" });
        });
})

module.exports = server;

function getById(id) {
    return db("posts")
        .where({ id })
        .first();
}