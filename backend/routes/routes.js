const { signup, login, createDocument, updateDocument, getAllDocuments } = require("../controllers/controllers")
const auth=require("../middleware/auth")
const router=require("express").Router()


router.post("/signup",signup)
router.post("/login",login)
router.get("/createdoc",auth,createDocument)
router.put("/autosave/:id",auth,updateDocument)
router.get("/getallRecentDoc",auth,getAllDocuments)


module.exports=router