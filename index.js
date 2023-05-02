const express=require('express');

const { connection}=require("./config/db")


const{userrouter}=require('./routes/userroute');

const{ postrouter}=require('./routes/postroute')

const app=express();

require('dotenv').config();

app.use(express.json());


app.get("/",(req,res)=>{
    res.json("welcome")
})

app.use("/user",userrouter);
app.use("/post",postrouter);

app.listen(process.env.port,async()=>{
    try {
       await connection
       console.log('Connected to Database');
       console.log(`Server is running on port ${process.env.port}`) 
    } catch (error) {
        console.log('Error while connecting to Database');
        console.log(error);
    }
})