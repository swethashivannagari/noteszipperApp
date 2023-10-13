const express =require("express");
const notes=require("./data/notes");
const userRoutes=require("./routes/userRoutes")
const noteRoutes=require("./routes/noteRoutes")

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
//const dotenv=require('dotenv')


const app=express();
//dotenv.config();
connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Api running");
});

//app.get('/api/notes',(req,res)=>{
//res.json(notes)
//});

/*app.get('/api/notes/:id',(req,res)=>{
    const note=notes.find((n)=>n._id===req.params.id);
    res.send(note);
})*/

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT||5000;

app.listen(5000,console.log(`server started at ${PORT}`));