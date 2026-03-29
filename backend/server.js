const app=require("express")()
const cors = require('cors');
const cookieParser=require("cookie-parser")
const bodyParser = require('body-parser');
require("dotenv").config();
const logger = require('morgan');
const session = require("express-session");
const dbConfig=require("./config/DBConfig")
const routes=require("./routes/routes")
const http = require("http");
const server = http.createServer(app);

//DB Config
dbConfig()


const { initSocket } = require("./socket");


initSocket(server);

app.use(cookieParser());
app.use(logger('dev'));






app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);


server.listen(4000,()=>{console.log("Server is Started in 4000 port")})