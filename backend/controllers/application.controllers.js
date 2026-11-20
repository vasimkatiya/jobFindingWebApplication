const applicationModel = require("../models/application.model");

exports.getAllApplicationController = async (req,res) =>{
    try {
        
        const page = Number(req.query?.page) || 1;
        const limit = Number(req.query?.limit) || 10;

        const skip = (page - 1) * limit;

        const jobId = req?.params?.id;

        const applications = await applicationModel.find({job_id:jobId}).populate('user_id').skip(skip).limit(limit);

        res.status(200).json({
            message:'all the application of this job.',
            applications
        });

    } catch (error) {
        console.error(error + 'getAllApplicationController');
        res.status(500).json({
            message:'internal server error in getAllApplicationController'
        })
    }
}


exports.createApplicationController = async (req,res) =>{
    try {
        
        const jobId = req?.params?.id;
        const userId = req?.user?.id;

        if(!jobId || !userId){
            return res.status(400).json({
                message:'userid and jobid are undefined'
            })
        } 

        await applicationModel.create({
            user_id:userId,
            job_id:jobId
        });

        res.status(201).json({
            message:'applocation sent successfully.'
        })

    } catch (error) {
        console.error(error + 'createApplicationController')
    }
}

exports.updateApplicationStatusController = async (req,res)=>{
    try {
        
        const applicationId = req.params?.id;

        const status = req.body?.status;
        
        const checkApplication = await applicationModel.findOne({job_id:applicationId});

        if(!checkApplication){
            return res.status(400).json({
                message:'undefined variables'
            })
        }

        if(status !== undefined){
            checkApplication.status = status ;
        }

        await checkApplication.save();

        const updatedApplication = checkApplication;

        res.status(200).json({
            message:'status updated successfully.',
            application:updatedApplication
        });

    } catch (error) {
        console.error(error + 'updateApplicationStatusController')
        res.status(500).json({
            message:'internal server error in updateApplicationStatusController'
        })
    }
}

exports.viewApplicationController = async (req,res)=>{
    try {
        
        const page = Number(req.query?.page) || 1;
        const limit = Number(req.query?.limit) || 10;
        const skip = (page - 1) * limit

        const id = req.user?.id;

        const appliedApplocation = await applicationModel.find({user_id:id}).populate('job_id').skip(skip).limit(limit);

        res.status(200).json({
            message:'applied applications',
            applications:appliedApplocation
        });

    } catch (error) {
        cnsole.error(error + 'viewApplicationController');
        res.status(500).json({
            message:'internal server error in viewApplicationController'
        })
    }
}