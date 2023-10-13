const express=require("express");
const {protect} =require("../middlewares/authMiddleware")
const { getNotes, createNote,getNoteById, updateNote, deleteNote } = require("../controllers/notesController");


const router=express.Router();

router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote)
router.route("/:id").get(getNoteById).put(protect,updateNote).delete(protect,deleteNote)

module.exports=router;