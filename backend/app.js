
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import projectRoutes from './routes/project.routes.js';
const app=express();


connect();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
// app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.send("working");
})

export default app;
