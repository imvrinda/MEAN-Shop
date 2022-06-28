const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')
const api = process.env.API_URL
const DB = process.env.DB_URL

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: "Dell laptop",
        image: 'some_url',
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
})

mongoose.connect(DB)
.then(() => {
    console.log('Success !!!')
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})

