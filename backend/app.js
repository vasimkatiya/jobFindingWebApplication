const express = require('express');
const connectDB = require('./db/connection');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const jobRouter = require('./routes/job.routes');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('<h1>hello this is a basic server checking</h1>');
});

app.use('/api/auth',authRouter);
app.use('/api/job',jobRouter);

connectDB();
app.listen(port,()=>{
    console.log('server running in the port number 3000');
})


