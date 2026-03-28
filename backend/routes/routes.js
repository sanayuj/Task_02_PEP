const { signup, login, createDocument, updateDocument, getAllDocuments, autoSaveDocument, getDocumentById } = require("../controllers/controllers")
const auth=require("../middleware/auth")
const router=require("express").Router()


router.post("/signup",signup)
router.post("/login",login)
router.get("/createdoc",auth,createDocument)
router.put("/autosave/:id",auth,updateDocument)
router.get("/getallRecentDoc",auth,getAllDocuments)
router.get("/documents/:id", getDocumentById);
router.put("/autosave/:id", autoSaveDocument);

module.exports=router