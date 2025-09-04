import {Router}from 'express';
import {body} from 'express-validator';
import * as usercontroller from '../controllers/user_controller.js';
import * as authmiddleware from '../middleware/auth.middleware.js';

const router=Router();

router.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 6 characters long'),
    usercontroller.createUserController);
router.post('/login',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 6 characters long'),
    usercontroller.logincontroller);
router.get('/profile',authmiddleware.authUser,usercontroller.profileController);

router.get('/logout',authmiddleware.authUser,usercontroller.logoutController);
router.get('/all',authmiddleware.authUser,usercontroller.getAllUsersController);

export default router;

