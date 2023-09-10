const express = require('express')
const app = express()
const port = 3000
const index = require('./routers/index');
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(index)

app.listen(port, () => {
  console.log(`Server is now running at port ${port}`)
})