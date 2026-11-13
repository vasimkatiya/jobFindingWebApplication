const { Router } = require("express");
const { registerController, loginController, logoutController, profileController, updateProfileController } = require("../controllers/auth.controllers");
const multer = require("multer");
const { authHandler } = require("../middlewares/auth.middleware");


const upload = multer({
    storage:multer.memoryStorage(),
    limits: {
    fileSize: 5 * 1024 * 1024
  }
});


const authRouter = Router();

authRouter.post('/register',upload.fields([
    {name:'avtar',maxCount:1},
    {name:'resumeFile',maxCount:1}
]),registerController);

authRouter.post('/login',loginController);

authRouter.post('/logout',logoutController);

authRouter.get('/profile',authHandler,profileController);
authRouter.patch('/update',authHandler,updateProfileController);

module.exports = authRouter;