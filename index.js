const express = require("express")

const app = express()
app.get("/",(req,res)=>{
    res.send("hei")
    
})
app.listen(2000)