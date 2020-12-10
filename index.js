const express = require("express");
// const connect = require('connect')
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');

const app = express();
// const connectApp = connect();
const port = process.env.PORT || 4001;

// app.use(bodyParser.json())
app.use('/users', usersRouter)
// connectApp.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Welcome to our server!')
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
