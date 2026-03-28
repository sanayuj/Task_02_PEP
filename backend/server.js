const app=require("express")()
const cors = require('cors');
const cookieParser=require("cookie-parser")
const bodyParser = require('body-parser');
require("dotenv").config();
const logger = require('morgan');
const session = require("express-session");
const dbConfig=require("./config/DBConfig")
const routes=require("./routes/routes")


//DB Config
dbConfig()

app.use(
  session({
    secret: "doc-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000
    }
  })
);

app.use(logger('dev'));

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);


app.listen(4000,()=>{console.log("Server is Started in 4000 port")})