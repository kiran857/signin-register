import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//get url from mongoose connect (google)
mongoose.connect('mongodb://localhost:27017/myLoginRegister',
{ useNewUrlParser: true,useUnifiedTopology:true},
()=>{
    console.log("DB connected");
});

//create DB schema and model

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const User=new mongoose.model("User",userSchema);

//create two router for login and register
app.post("/login",(req,res)=>{
    //res.send(" MY API")
    const{email,password}=req.body

    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successfully"})
            }else{
                res.send({message:"Password inccorect"})
            }
        }else{
            res.send({message:"User Not registed"})
        }
    });
});

app.post("/register",(req,res)=>{
   // res.send(" MY API")
   //console.log(req.body)
   const{name,email,password}=req.body
   //check if user is already registerd or not  by using findOne() method.

   User.findOne({email:email},(err,user)=>{
       console.log(user)
       if(user){
           res.send({message:"User already registed"})
       }else{
            //create DB User
            const user=new User({
                name,
                email,
                password
            })
            user.save( err =>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Successfully Registed"})
                   }
            })
                }
            })
   
});


app.listen(9002,()=>{
    console.log("server started at port 9002")
});