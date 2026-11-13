const jobModel = require('../models/job.model');

require('dotenv').config();

exports.createJobController = async (req,res) =>{
    try {

        const {title,desc,location,salary,jobType} = req?.body;

        const company_id = req?.user?.id;

if (
    !title ||
    !desc ||
    !location ||
    salary === undefined ||
    !jobType
) {
    return res.status(400).json({
        message: 'All fields are required.'
    });
}


        if(!company_id){
            return res.status(404).json({
                message:'id not found.'
            })
        }

        await jobModel.create({
            company_id,
            title,
            desc,
            location,
            salary,
            jobType
        });

        
        res.status(201).json({
            message:'job added successfully.'
        })


    } catch (error) {
        console.error(error + 'createJobController');
        res.status(500).json({
            message:'internal server error in createJobController'
        })
    }
}

exports.deleteJobController = async (req,res)=>{
    try {
        
        const jobId = req.params?.id;

        const companyId = req.user?.id;

        const job = await jobModel.findById(jobId);

        if(!job){
            return res.status(400).json({
                message:'job not found'
            })
        }

        if(job.company_id.toString() !== companyId){
            return res.status(400).json({
                message:'you cannot delete the job.'
            })
        }

        await job.deleteOne();

        res.status(200).json({
            message:'job deleted successfully.'
        });
        
    } catch (error) {
        console.error(error + 'deleteJobController');
        res.status(500).json({
            message:'internal server error in deleteJobController'
        })
    }
}

exports.getAllJobController = async (req,res) =>{
    try {
        
        const page = Number(req?.query?.page)|| 1;
        const limit = Number(req?.query?.limit) || 10;

        const skip = (page - 1) * limit;

        const jobs = await jobModel.find().populate('company_id','name avtar').skip(skip).limit(limit);

        res.status(200).json({
            message:'job disaply successfully.',
            jobs
        })

    } catch (error) {
        console.error(error + 'getAllJobController');
        res.status(500).json({
            message:'internal sever error in getAllJobController'
        })
    }
}


exports.viewCreatedJobController = async (req,res) =>{
    try {
        
        const userId = req.user?.id;

        const page = Number(req.query?.page) || 1;
        const limit =  Number(req.query?.limit) || 10;
        const skip = (page - 1) * limit;

        const jobs = await jobModel.find({company_id : userId}).skip(skip).limit(limit);

        res.status(200).json({
            message:'job fetched successfully.',
            jobs
        })

    } catch (error) {
        console.error(error + 'viewCreatedJobController');
    }
}

exports.viewJobController = async (req,res) =>{
    try {
        
        const id = req.params?.id;
        
        const job = await jobModel.findById(id).populate('company_id');

        if(!job){
            return res.status(404).json({
                message:'job not found.'
            })
        }

        res.status(200).json({
            message:'job displayed.',
            job
        })

    } catch (error) {
        console.error(error + 'viewJobController');
        res.status(500).json({
            message:'internal server error in viewJobController'
        })
    }
}