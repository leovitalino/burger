const { request } = require("express")
const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())

const orders = []
app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, clientName, price, status } = request.body

    const kOrder = { id: uuid.v4(), order, clientName, price, status }

    orders.push(kOrder)

    console.log(kOrder)

    return response.json(kOrder)
})

app.put('/orders/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body

    const updateOrder = { id, order, clientName, price, status }

    const index = orders.findIndex( order => order.id === id)

    if(index < 0){
        return response.status(404).json({ message: "Order not found"})
    }

    orders[index] = updateOrder
    
    return response.json(updateOrder)
})

app.patch('/orders/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body

    const updateStatus = { id, order, clientName, price, status }

    const indexStatus = orders.findIndex( order => order.id === id)

    if(indexStatus < 0){
        return response.status(404).json({ message: "Order not found"})
    }

    orders[indexStatus] = updateStatus
    
    return response.json(updateStatus)
})

app.delete('/orders/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex( order => order.id === id)

    if(index < 0){
        return response.status(404).json({ message: "Order not found"})
    }

    orders.splice(index,1)
    
    return response.status(202).json()
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

/* 

    user: leleotv10
    password: AtgrEnSIm33swi3n

*/