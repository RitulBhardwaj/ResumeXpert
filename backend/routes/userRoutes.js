import express from 'express';
import { registerUser, loginUser, getUserData } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/profile',protect,getUserData);  

export default userRouter;
        //check if password matches