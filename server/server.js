const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
var bodyparser = require('body-parser')

const router = require('./router')

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())
app.use(bodyparser.json())

mongoose.connect('mongodb+srv://somitdb:somitdbpassword@cluster0.in6qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Server has started.......");
    router(app);
    app.listen(port, () => {
      console.log(`server is running on port:  ${port}`);
    })
  })
  .catch((err) => {
    console.log(err);
  });
