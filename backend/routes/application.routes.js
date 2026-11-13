const { Router } = require('express');
const { createApplicationController, getAllApplicationController, updateApplicationStatusController, viewApplicationController } = require('../controllers/application.controllers');
const { authHandler } = require("../middlewares/auth.middleware");
const { companyAccessHandler } = require("../middlewares/access.middleware");



const applicationRouter = Router();

applicationRouter.post('/create/:id',authHandler,createApplicationController);
applicationRouter.get('/all/:id',authHandler,companyAccessHandler,getAllApplicationController);
applicationRouter.patch('/status/:id',authHandler,companyAccessHandler,updateApplicationStatusController);
applicationRouter.get('/user/all',authHandler,viewApplicationController);

module.exports = applicationRouter;