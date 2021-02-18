const express = require('express')
require('dotenv').config()

const app = express()

const transactionRouter = require('./routes/getTransactions')

app.use('/dump', transactionRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Now listening at port ${port}`)
})
  