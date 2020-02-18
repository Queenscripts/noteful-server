require('dotenv').config()
const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors')
const {NODE_ENV} = require('./config')
const uuid = require('uuid/v4');
const noteRouter = require('./notes/note-router')
const folderRouter= require('./folders/folders-router')
const app = express()
const bodyParser = express.json()
app.use(morgan(((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  })))
app.use(express.json())
app.use('/api/folders', folderRouter)
app.use('/api/notes', noteRouter)



app.get('/', (req, res) => {
    res.send('hello! I\'\m runnin :)')
})

app.use(function errorHandler(error, req, res) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })
module.exports = app