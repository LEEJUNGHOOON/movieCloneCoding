const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello nigga')
})

app.listen(4000)