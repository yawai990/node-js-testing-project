const express = require('express');
const expressEjslayout = require('express-ejs-layouts');
const bcrypt = require('bcrypt'); 
const bodyParser = require('body-parser');
const app =express();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initPassport = require('./auth/passport');
const methoOverride = require('method-override');
const users = [];
const {checkAuthenticate,checkNotAuthenticate} = require('./middleware/auth');


initPassport(
    passport,
    email=>users.find(user=>user.email === email),
    id=>users.find(user=>user.id === id)
);

app.use(expressEjslayout);
app.set('view engine','ejs');


//middleware
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json({urlencoded:false}));
app.use(methoOverride('_method'));
app.use(flash());
app.use(session({
    secret:'secreat',
    resave:false,
    saveUninitialized:false,
}));

app.use(passport.initialize());
app.use(passport.session())

app.get('/',checkAuthenticate,(req,res)=>{
    res.render('Home',{name:req.user.name})
})

app.get('/login',checkNotAuthenticate,(req,res)=>{
    res.render('Login')
});

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}));

app.get('/register',checkNotAuthenticate,(req,res)=>{
    res.render('Register')
});

app.post('/register',async (req,res)=>{
    const {email,username,password,c_password} = req.body;

    try {   
        if(password === c_password){
            const hashedPassword = await bcrypt.hash(password,10);

            users.push({
                id:Date.now().toString(),
                name:username,
                email,
                password:hashedPassword
            });

            res.redirect('/login')
        }
    } catch (error) {
            res.redirect('/register');
    };
});
app.delete('/logout',(req,res,next)=>{
    req.logOut(err=>next(err));
    res.redirect('/login')
})
app.listen(5000);