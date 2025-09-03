import {Router}from 'express';
import{body} from 'express-validator';
const router=Router();
import * as project_controller from '../controllers/project_controller.js';    
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/create',authMiddleware.authUser,
    body('name').isString().withMessage('name is required'),
    project_controller.createProject
)

export default router;