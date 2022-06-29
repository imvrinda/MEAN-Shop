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

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock:{
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`, (req, res) => {
    const proudctList = Product.find()
    res.send(proudctList)
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) =>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
    
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

