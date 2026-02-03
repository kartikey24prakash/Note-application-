const express=require('express')
const nodemodel = require('./model/model.data')
const app =express()

const cors =require('cors')
const path =require('path')


app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


const notes ={
}

app.post('/note',async(req,res)=>{

    const{title,description}=req.body
    const notes = await nodemodel.create({
        title,description
    })
    res.status(201).json({
        message:"note created ",
        notes
    })
    console.log(req.body)
})

app.get('/note',async (req,res)=>{
    const notes = await nodemodel.find()
    res.status(200).json(notes)
})

app.delete('/note/:Id',async (req,res)=>{

    const id=req.params.Id
    await nodemodel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note deleted"
    })
})

app.patch('/note/:Id',async (req,res)=>{
    const id=req.params.Id
    const{description}=req.body
    await nodemodel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:'note updated succesfully'
    })
})
// console.log(__dirname)
// app.use('*name',(req,res)=>{
//     res.sendFile(path.join(__dirname,"..","/public/index.html"))
// })

module.exports=app