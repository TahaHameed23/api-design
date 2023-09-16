// const http = require('http')

// const server = http.createServer(async(req,res)=>{ //->route-handler 
//     if (req.method === 'GET' && req.url==='/' ){
//         console.log("first")
//         res.end()
//     } 
// })

// server.listen(3001, ()=>{
//     console.log("server on localhost://3001");
// }) 
//old way

import * as dotenv from 'dotenv'
dotenv.config()
import app from "./server"

app.listen(3001, ()=>{
    console.log("server running on http://localhost:3001");
})