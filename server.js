const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const studentRoutes=require('./api/routes/students');
const BDCRoutes=require('./api/routes/BDC');

mongoose.connect('mongodb+srv://dhruvix:'+'dhruva2412'+'@mongonss-qoa8m.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/students',studentRoutes); 
app.use('/BDC',BDCRoutes);
app.use((req,res,next)=>{
    const error = new Error('Not Found in the backend');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    if(process.env.PORT){
        console.log(`server is running on port ${process.env.PORT}`);
    }
    else{
        console.log('server is running on port 3000');
    }
});
