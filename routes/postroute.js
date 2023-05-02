const express=require('express');

const{PostModel}=require("../models/postmodel");

const{ UserModel}=require("../models/usermodel")

const postrouter=express.Router();


postrouter.post("/posts",async(req,res)=>{
    let payload=req.body;
    let user_id=req.body.user
    try {
       let post_data=await PostModel(payload);
       await post_data.save();
       console.log(post_data);
       let user_data=await UserModel.find({"_id":user_id})
       console.log(user_data);
       if(user_data.length>0){
        user_data[0].posts.push(post_data);
       let resp= await user_data[0].save();
       res.json(resp);
       }
       res.status(201).json({msg:"created the post"}) 
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while posting the post"})
    }
})

postrouter.get("/posts",async(req,res)=>{
    try {
        let post_data=await PostModel.find();
        res.status(200).json(post_data);
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while fetching the post"})
    }
});

postrouter.patch("/posts/:id",async(req,res)=>{
    const {text,image,likes,comments}=req.body;
    let post_id=req.params.id
    let user_id=req.body.user;
    let user_id_database=await PostModel.findOne({"user":user_id});
    const use_id=  user_id_database.user;
    const id_only=use_id.toString();
    // console.log(user_id,id_only)
    try {
        if(user_id===id_only){
            await PostModel.findByIdAndUpdate({"_id":post_id},{text,image,likes,comments});
            res.json({"msg":"updated the Post Data"})
        }else{
            res.json({"msg":"you are not authorized"})
        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while updating the post"})
    }
}) 


postrouter.delete("/posts/:id",async(req,res)=>{
    const {text,image,likes,comments}=req.body;
    let post_id=req.params.id
    let user_id=req.body.user;
    let user_id_database=await PostModel.findOne({"user":user_id});
    const use_id=  user_id_database.user;
    const id_only=use_id.toString();
    // console.log(user_id,id_only)
    try {
        if(user_id===id_only){
            await PostModel.findByIdAndDelete({"_id":post_id},{text,image,likes,comments});
            res.json({"msg":"Deleted the Post Data"})
        }else{
            res.json({"msg":"you are not authorized"})
        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while updating the post"})
    }
});

postrouter.get("/posts/:id",async(req,res)=>{
    let id=req.params.id;
    try {
        let post_data= await PostModel.find({"_id":id});
        res.json({"msg":post_data});
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while finding the post"})
    }
})

postrouter.post("/posts/:id/like",async(req,res)=>{
    
    let post_id=req.params.id
    let user_id=req.body.user;
    let user_id_database=await PostModel.findOne({"user":user_id});
    const use_id=  user_id_database.user;
    const id_only=use_id.toString();
    // console.log(user_id_database,id_only) 
    try {
        if(user_id==id_only){
            let post_data=await PostModel.find({"_id":post_id});
            // console.log(post_data);
            post_data[0].likes.push(user_id);
            await post_data[0].save();
            res.json({"msg":`This userid ${user_id} liked the post`})

        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while liking the post"})
    }
})

postrouter.post("/posts/:id/comment",async(req,res)=>{
    
    let post_id=req.params.id
    let user_id=req.body.user;
    let user_id_database=await PostModel.findOne({"user":user_id});
    const use_id=  user_id_database.user;
    const id_only=use_id.toString();
    // console.log(user_id_database,id_only) 
    try {
        if(user_id==id_only){
            let post_data=await PostModel.find({"_id":post_id});
            // console.log(post_data);
            post_data[0].comments.push(user_id);
            await post_data[0].save();
            res.json({"msg":`This userid ${user_id} commented on the post`})

        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while commenting on the post"})
    }
})

module.exports={
    postrouter
}


// {
//     "user":"6450b768fd786cc3e8c4759c",
//     "text":"I am a developer",
//     "image":"https://via.placeholder.com/350x250",
//     "createdat":"2023-05-02"
    
//   }