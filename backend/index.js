    const express = require("express");
    const app = express();
    const dotenv = require("dotenv");
    dotenv.config();
    const PORT = process.env.PORT||5000;



    app.listen(PORT,()=>{
        console.log(`Backend is listening on PORT=http://localhost:${PORT}`);
    })

    app.get("/",(req,res)=>{
    res.send(`Backend is running My friend!`);
    });