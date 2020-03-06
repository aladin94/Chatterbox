const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const path = require('path');
const app = express()
  

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:b3627f50-d19e-4c14-adda-059b87ee164d',
  key:
    'd356c8da-9b59-43f3-890b-c9dc4b32a73c:3YNPnOjImsE9vqjwffVl2KlPCKFKSDtgVDVji0GyLvM='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})



app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
});
