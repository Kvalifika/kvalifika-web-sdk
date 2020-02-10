const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const app = express()

console.log()

app.use(bodyParser.json())
app.use(cors())

app.use(express.static('public'))

// This is only for demo purposes store this token inside enviroment variables and do not show it to anyone
const Authorization = process.env.SECRET_TOKEN

// Here we register rest route to check users session status
app.get('/check-session/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId

  // in options we need to pass sessionId as parameter
  // and our secret token as authorization header
  const options = {
    url: `http://localhost:8000/verification/status/${sessionId}`,
    headers: { Authorization }
  };

  // here we create request to kyc backend
  request(options, (err, response, body) => {
    if (err) {
      // handle error
      res.status(400).json(err)
    } else {
      // handle success
      res.status(200).json(body)
    }
  })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`))