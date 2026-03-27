const app=require("express")()
const dbConfig=require("./config/DBConfig")

//DB Config
dbConfig()












app.listen(4000,()=>{console.log("Server is Started in 4000 port")})