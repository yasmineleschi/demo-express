const express = require('express')
const app = express()
const products = require('./data.js')
const products_routes = require('./routes/products.js')

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})
const logger  = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    next()
}
app.use('/api', logger)

const auth  = (req, res, next) => {
    const user = req.query.user
    if (user === 'admin') {
        req.user = { name: 'admin', id: 1 }
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}
app.use([logger, auth])
app.use(auth)

app.get('/about', (req, res) => {
    console.log(req.user)
    return res.send('About Page')
})
app.use(express.json())
app.use('/api/products', products_routes)

/*app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})
app.get('/api/products', (req, res) => {
    res.json(products)
})
app.get('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})

app.put('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).send('Product not found')
    }
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }
    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

app.delete('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
        if (index === -1) {
        return res.status(404).send('Product not found')
    }
    products.splice(index,1)
    res.status(200).json('Product deleted')
})*/