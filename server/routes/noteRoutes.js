const express = require('express')
const router = express.Router()
const Note = require("../models/Note")


router.post('/',async(req,res)=>{
    const note = new Note(req.body)
    await note.save()
    res.json(note)
})


router.get('/',async(req,res)=>{
    const notes = await Note.find()
    res.json(notes)
})


router.put('/:id',async(req,res)=>{
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.json(note)
})


router.delete('/:id', async(req,res)=>{
    const note = await Note.findByIdAndDelete(req.params.id)
    res.json(
        {message : "Data deleted"}
    )
})

module.exports = router