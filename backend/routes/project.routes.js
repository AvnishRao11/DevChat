import {Router}from 'express';
import{body} from 'express-validator';
const router=Router();
import * as project_controller from '../controllers/project_controller.js';    
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/create',authMiddleware.authUser,
    body('name').isString().withMessage('name is required'),
    project_controller.createProject
)
router.get('/all',authMiddleware.authUser,project_controller.getAllProjects);

router.put(
    '/add-user',
    authMiddleware.authUser,
    body('projectId')
        .isString()
        .withMessage('projectid must be a string'),
    body('users')
        .isArray({ min: 1 })
        .withMessage('users must be a non-empty array')
        .custom((arr) => arr.every((u) => typeof u === 'string'))
        .withMessage('each user must be a string'),
    project_controller.addUserToProject
);
router.get('/get-project/:projectId',authMiddleware.authUser,project_controller.getProjectById);
export default router;