const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var cookieParser = require('cookie-parser')

app.use(cors());
app.use(cookieParser())

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3200;
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))


mongoose.connect(
    "mongodb+srv://sanya30122000:sanya30122000@cluster0.vmkwj.mongodb.net/B_assignment-1?retryWrites=true&w=majority", 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
});

const userRoutes = require('./routes/usersRoute');
const postRoutes = require('./routes/postRoute')


app.use('/api',userRoutes);
app.use('/api',postRoutes);


app.listen(PORT, ()=>{
    console.log("app is listeing on 3200");
})