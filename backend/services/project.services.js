import projectModel from '../models/project_model.js';
import mongoose from 'mongoose';

export const createProject = async ({ name, userId }) => {
    if (!name) {
        throw new Error('Project name is required');
    }
    if (!userId) {
        throw new Error('User Id is required');
    }

    const project = await projectModel.create({
        name,
        users: [userId],
    });

    return project;
};

export const getAllProjects=async({userId})=>{
    if(!userId){
        throw new Error('User Id is required');
    }
    const allUserProjects=await projectModel.find({
        users:userId,

    })
    return allUserProjects;
};

export const addUserToProject = async ({ projectId, users, userId }) => {
  if (!projectId) throw new Error('Project Id is required');
  if (!users) throw new Error('users are required');
  if (!userId) throw new Error('User Id is required');

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid User Id');
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error('Invalid Project Id');
  }

  for (const uid of users) {
    if (!mongoose.Types.ObjectId.isValid(uid)) {
      throw new Error(`Invalid User Id: ${uid}`);
    }
  }

  const project = await projectModel.findOne({ _id: projectId, users: userId });
  if (!project) throw new Error('User not belong to this project');

  const updatedProject = await projectModel.findByIdAndUpdate(
    projectId,
    { $addToSet: { users: { $each: users } } },
    { new: true }
  );

  return updatedProject;
};

export const getProjectById=async({projectId})=>{
    if(!projectId) throw new Error('Project Id is required');

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project Id');
    };
    const project=await projectModel.findOne({
        _id:projectId,
    }).populate('users');
    return project;
}
