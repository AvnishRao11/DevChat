
import userModel from '../models/user_model.js';
import * as userServices from '../services/user_services.js';
import {validationResult} from 'express-validator';
import redisClient from '../services/redis.services.js';

export const createUserController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 
    try{
        const user=await userServices.CreateUser(req.body);
        const token=await user.generateJWT();
        delete user._doc.password;
        res.status(201).json({user,token});
    }
    catch(err){
        res.status(400).send(err.message);
    }
};  
export const logincontroller=async(req,res)=>{
    const errors=validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email}).select('+password');
        if(!user){
           return res.status(401).json({errors:"Invalid email or password"});
        }
        const isMatch=await user.isvalidPassword(password);
        if(!isMatch){
            return res.status(401).json({errors:"Invalid email or password"});
        }
        const token=await user.generateJWT();
        delete user._doc.password;
        res.status(200).json({user,token});
    }
    catch(err){
        res.status(400).send(err.message);
    }
}
export const profileController=async(req,res)=>{
    console.log(req.user);  
    res.status(200).json({
        user:req.user,
    });
}
export const logoutController=async(req,res)=>{
    try{
        
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];
        await redisClient.set(token, "logout", "EX", 24 * 60 * 60);
        res.status(200).json({message:"Logged out successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
}

export const getAllUsersController=async(req,res)=>{
    try{
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const allUsers=await userServices.getAllusers({
            userId:loggedInUser._id,
        });
        return res.status(200).json({users:allUsers});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }  
};