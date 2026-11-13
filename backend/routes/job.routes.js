const { Router } = require("express");
const { authHandler } = require("../middlewares/auth.middleware");
const { companyAccessHandler } = require("../middlewares/access.middleware");
const { createJobController, deleteJobController, viewJobController, getAllJobController, viewCreatedJobController } = require("../controllers/job.controllers");


const jobRouter = Router();


jobRouter.post('/create',authHandler,companyAccessHandler,createJobController);
jobRouter.get('/all',authHandler,companyAccessHandler,getAllJobController)
jobRouter.delete('/delete/:id',authHandler,companyAccessHandler,deleteJobController);
jobRouter.get('/view/company',authHandler,companyAccessHandler,viewCreatedJobController);
jobRouter.get('/view/:id',authHandler,viewJobController);


module.exports = jobRouter;