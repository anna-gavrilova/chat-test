const express=require('express');
var mongoose = require("mongoose");
const app=express();
const bodyParser = require('body-parser');
var cors = require('cors');
const loginRoute=require("./routes/login")
const userRoute=require('./routes/users')
const conversationRoute=require('./routes/conversations')
const path = require('path');

app.use(cors());

mongoose.connect("mongodb://admin:admin1@ds255784.mlab.com:55784/my-chat")
    .then(_=>{
        console.log("Connected to db");
    })
    .catch(err=>{
        console.log(`Connection error ${err.message}`)
    });

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept', 'user');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            
        next();
      });
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use("/api/login",loginRoute);
    app.use("/api/users",userRoute)
    app.use("/api/dialogs",conversationRoute);
    app.use(express.static(path.join(__dirname,'build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'build/index.html'))
    })
    module.exports=app;

