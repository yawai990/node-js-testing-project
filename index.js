const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/User');
const authMiddleware = require('./middleware/auth');
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true,limit:'50MB'}));
app.use('/user',userRouter);

app.get('/',authMiddleware,(req,res)=>{
    res.send('welcome from API')
});



app.listen(PORT,()=>console.log(`server is running in ${PORT}`));