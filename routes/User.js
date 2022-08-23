const express = require('express');
const userRouter = express.Router();
const {login,register } = require('../controller/user');

userRouter.post('/login',login)
                 .post('/register',register);

module.exports = userRouter;