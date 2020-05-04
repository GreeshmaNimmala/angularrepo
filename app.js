const express=require('express');
const app=express();
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
require('./nodemon.json');




const userRoutes=require('./api/routes/user');

mongoose.connect('mongodb+srv://angularauth:'+ process.env.MONGO_ATLAS_PW +'@angularauth-clrfr.mongodb.net/test?retryWrites=true&w=majority',
{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => console.log('DB Connected!'))
.catch(err => {
console.log('Mongo connection error', err);
});
mongoose.Promise=global.Promise;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/user',userRoutes);

// app.use((req,res,next)=>{
//     res.send("Hello");
// });

app.use((req,res,next)=>{
    const error=new Error();
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:error
    });
});

module.exports=app;