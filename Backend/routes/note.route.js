const express = require("express");
const app=express();
const noteRoute = express.Router();
app.use(express.json());
const {NoteModel} = require("../models/note.model")

noteRoute.get("/",async (req,res)=>{

    console.log(req.body)
    try {
        const notes = await NoteModel.find({userID:req.body.userID});
        res.send(notes)
    } catch (error) {
        res.send({"msg":error.message})
    }

})

noteRoute.post("/add",async (req,res)=>{
  
    try {
    const note = new NoteModel(req.body);
    await note.save()
    res.send({"msg":"A New note added"})
    } catch (error) {    
        res.send({"msg":error.message})
    }
   
})

noteRoute.patch("/update/:noteID",async (req,res)=>{
 
    const {noteID} = req.params
    try {
        
        await NoteModel.findByIdAndUpdate({_id:noteID},req.body)

        res.send({msg:"note has been updated..!!"})


    } catch (error) {
        
        res.send({msg:error.message})
    }

    res.send()

})
noteRoute.delete("/delete/:noteID",async (req,res)=>{

    const {noteID} = req.params
    try {
        
        await NoteModel.findByIdAndDelete({_id:noteID})

        res.send({msg:"note has been deleted..!!"})


    } catch (error) {
        
        res.send({msg:error.message})
    }

    res.send()

})


module.exports = {noteRoute}