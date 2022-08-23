const jwt = require('jsonwebtoken');

const login =async(req,res)=>{
    // const {email,password} = await req.body;
    const email = 'email from the database';
    const password = 'password from the database'
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
    const {email,username,password,confirmpassword} =await req.body;
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!email || !password || !username || !confirmpassword) {
        res.status(400).json({
            message:'please fill all the require fileds'
        });
    }
    // else if(email.match(regExp)){
    //     res.status(400).json({
    //         message:'your email address is incorrect'
    //     })
    // }
    //check the password are the same
    else if(password !== confirmpassword){
        res.status(400).json({
            message:'your password are not matching,Please Check your password'
        });
    }
    else{
        if(email !== 'aungaung@gmail.com'){
               //keep the email,username,password in the database
               res.status(201).json({
                message:'your accout is created'
            }).redirect('/login');
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

module.exports = {login,register};
