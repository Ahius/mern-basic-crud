import express from "express"
import mysql from "mysql2"
import cors from "cors"
// const express = require('express');

const app = express()


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json('Hello this is backend!!~')
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"
    db.query(query, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const VALUES = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(query, [VALUES], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been created successfully!")
    })
})


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id =?";
    db.query(query, [bookId], (err, data) => {
        if(err) return res.json(err)
            return res.json("book has been deleted successfully!")
    })
} )

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title` = ?, `desc` =?, `price`=?, `cover`=? WHERE id =?";
    const VALUES = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(query, [...VALUES, bookId], (err, data) => {
        if(err) return res.json(err)
            return res.json("book has been updated successfully!")
    })
} )

app.listen(8800, () => {
    console.log("Connected Back-end!");
    
})