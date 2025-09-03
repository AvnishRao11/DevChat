import { createProject as createProjectService } from '../services/project.services.js';
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
