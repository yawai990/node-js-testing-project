const express = require('express');
const userRouter = express.Router();
const {login,register,loginForm,registerForm } = require('../controller/user');

userRouter.get('/login',loginForm)
                 .post('/login',login)
                 .get('/register',registerForm)
                 .post('/register',register);

module.exports = userRouter;