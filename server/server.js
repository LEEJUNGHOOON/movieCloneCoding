
const llist = {"name" :"wjdgns","age" : "25"}
const port =4000;
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/practice/:id',(req, res) =>{
    const q = req.params;
 
    res.json({'user':q})
  })

app.listen(4000)