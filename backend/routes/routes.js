const { signup, login, createDocument, updateDocument, getAllDocuments, autoSaveDocument, getDocumentById, deleteDocumentByid, shareDocument, getMe, logout } = require("../controllers/controllers")
const auth=require("../middleware/auth")
const router=require("express").Router()


router.post("/signup",signup)
router.post("/login",login)
router.get("/createdoc",auth,createDocument)
router.put("/autosave/:id",auth,updateDocument)
router.get("/getallRecentDoc",auth,getAllDocuments)
router.get("/documents/:id",auth, getDocumentById);
router.put("/autosave/:id",auth, autoSaveDocument);
router.delete("/deleteDoc/:id",auth,deleteDocumentByid)
router.post("/sharedoc/:id",auth,shareDocument)
router.get("/me", auth, getMe);
router.post("/logout",auth,logout)


module.exports=router