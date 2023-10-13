const express=require('express');
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router=express.Router()

router.post('/',registerUser)
router.post('/login',authUser)
router.route('/profile').post(protect,updateUserProfile)

module.exports=router;