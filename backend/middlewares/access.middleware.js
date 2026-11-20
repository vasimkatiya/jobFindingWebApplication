const userModel = require("../models/user.model");


exports.companyAccessHandler = async (req,res,next) =>{
    try {
        
        const id = req?.user?.id;

        if(!id){
            console.error("id is undefined.");
            return res.status(400).json({
                message:'id is undefined'
            })
        }

        const recruiter = await userModel.findById(id);
        
        if(!recruiter){
            return res.status(404).json({
                message:'user not found.'
            })
        }

        if(recruiter.role == "user"){
            return res.status(400).json({
                message:'user can not access this features.'
            });
        }

        next();

    } catch (error) {
        console.error(error + 'companyAccessHandler');
        res.status(500).json({
            message:'internal server error in companyAccessHandler'
        })
    }
}