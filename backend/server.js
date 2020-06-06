const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require('body-parser')
const UserRoutes = require("./routes/UserRoutes")
const path=require('path')
const config = require("./config/key");
var morgan= require('morgan')

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'))



// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: config.mongoURI,
    collection: "mySessions"
});


mongoDBstore.on('connected', () => console.log("mongoDBstore Connected"))
mongoDBstore.on('error', () => console.log("mongoDBstore not connected"))



app.use(
  session({
    name: config.COOKIE_NAME,
    secret: config.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBstore,
    proxy : true,              // this should be true for session to be work on heroku
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // Three hours
      sameSite: false,
      secure: config.IS_PROD,
    }
  })
);



const PORT = process.env.PORT || 4000


app.use("/api/user", UserRoutes)


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"../",'client/build')))

  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,"../",'client','build','index.html'))
  })
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
