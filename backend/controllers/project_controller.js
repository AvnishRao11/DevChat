import { createProject as createProjectService } from '../services/project.services.js';
import { getAllProjects as getAllProjectsService } from '../services/project.services.js';
import { getProjectById as getAllProjectsByIdService } from '../services/project.services.js';
import { addUserToProject as addUserToProjectService } from '../services/project.services.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user_model.js';
export const createProject = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const newProject = await createProjectService({ name, userId });
        res.status(201).json(newProject);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const getAllProjects=async(req,res)=>{
    try{
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const alluserProjects=await  getAllProjectsService({userId:loggedInUser._id});
        return res.status(200).json({projects:alluserProjects});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
};

export const addUserToProject=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    try{
        const {projectId, users}=req.body;
        const loggedInUser=await userModel.findOne({
            email:req.user.email,

        })
        const project=await addUserToProjectService({projectId,users,userId:loggedInUser._id});
        return res.status(200).json({project});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
};
export const getProjectById=async(req,res)=>{
    const{projectId}=req.params;
    try{
        console.log(projectId);
        const project=await getAllProjectsByIdService({projectId});
        return res.status(200).json({project}); 
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}