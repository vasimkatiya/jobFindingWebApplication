const userModel = require("../models/user.model");


exports.userAccessHandler = async (req,res,next) =>{
    try {
        
        const id = req?.user?.id;

        if(!id){
            console.error("id is undefined.");
            return res.status(400).json({
                message:'id is undefined'
            })
        }

        const user = await userModel.findById(id);
        
        if(!user){
            return res.status(404).json({
                message:'user not found.'
            })
        }

        if(user.role == "recruiter"){
            return res.status(400).json({
                message:'recruiters or company cannot access this features.'
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