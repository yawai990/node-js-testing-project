const { express } = require('cookies');
const jwt = require('jsonwebtoken');

const loginForm =async (req,res)=>res.render('Login');
const registerForm =async (req,res)=>res.render('Register');
const login =async(req,res)=>{
    const {email,password} = await req.body;

    if(!email || !password){
        res.status(400).json({
            message:"Please fill all the require fileds"
        });
    }
    else{
        //get the email and password from the data base check
        if(email === 'email from the database' || password === 'password from the database'){

            const token = jwt.sign({email},'SECRET',{expiresIn:'30d'});

            res.status(200).json({
                message:'account login & get the token for the access',
                token:`Bearer ${token}`
            });
        }
    }
};

const register =async (req,res)=>{
    const {email,username,password,c_password} =await req.body;
    // const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!email || !password || !username || !c_password) {
        res.status(400).json({
            message:'please fill all the require fileds'
        });
    }
    //check the password are the same
    else if(password !== c_password){
        res.status(400).json({
            message:'your password are not matching,Please Check your password'
        });
    }
    else if(password.length < 6){
        res.status(400).json({
            message:'password length at least 6 character'
        })
    }
    else{
        if(email !== 'aungaung@gmail.com'){
               //keep the email,username,password in the database
               res.status(201).json({
                message:'your accout is created'
            });
        }
        else{       
         //get the data from the databse
        //check the email is already exit
            res.status(400).json({
                message:'your email address is already registerd'
            });
        }
    }
};

module.exports = {login,register,loginForm,registerForm};
