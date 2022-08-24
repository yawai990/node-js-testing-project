const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/User');
const authMiddleware = require('./middleware/auth');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;

//middleware
app.use(expressLayouts);
app.set('view engine','ejs');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false,limit:'50MB'}));
app.get('/',(req,res)=>{
    res.render('Login')
})
app.use('/user',userRouter);
app.use('/user/data',authMiddleware,(req,res)=>{
    res.send('welcome from API')
});



app.listen(PORT,()=>console.log(`server is running in ${PORT}`));