const { uploadFile } = require('../config/cloudinary.config');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.registerController = async (req,res)=>{
    try {
        
        const {name,email,password,role} = req?.body;
        const avtarFile = req?.files?.avtar?.[0];
        const resumeFile = req?.files?.resumeFile?.[0];

        let avtarResult;
        let resumeResult;

        const isExists = await userModel.findOne({email});
        
        if(isExists){
            return res.status(400).json({
                message:'user of the email already exists.',
            });
        }

        if(avtarFile){
            avtarResult = await uploadFile(avtarFile.buffer,"image");
        }

        if(resumeFile){
            resumeResult = await uploadFile(resumeFile.buffer,"raw");
        }

        if(!avtarResult){
            return res.status(400).json({
                message:'avtar image not uploading.'
            });
        }


        const hashPassword = await bcrypt.hash(password,10);
        

        const user = await userModel.create({
            name,
            email,
            password:hashPassword,
            avtar:avtarResult.secure_url,
            role,
            resumeFile:resumeResult? resumeResult.secure_url : " "            
        });

        
        res.status(201).json({
            message:'user register successfully.',
            user,
        })

    } catch (error) {
        console.error(error + "register controller error.");
        res.status(500).json({
            message:'internal server error in registerController '
        })
    }
}


exports.loginController  = async (req,res) =>{
    try {

        const {email,password} = req?.body;

        if(!email || !password){
            return res.status(400).json({
                message:"email or password not be empty.",
            })
        }

        const isExists = await userModel.findOne({email}).select("+password");

        if(!isExists){
            return res.status(404).json({
                message:'user not found'
            })
        }

        const user = isExists;

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:'invalid password'
            })
        }
        
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 14 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message:'login successfully',
            user
        });

    } catch (error) {
        console.error(error + "login controller error.");
        res.status(500).json({
            message:'interna server error in loginController'
        })
    }
}

exports.logoutController = (req,res) =>{
    try {

        const token = req?.cookies?.token;

        if(!token){
            return res.status(404).json({
                message:'token not found.'
            })
        }

        res.clearCookie('token');

        res.status(200).json({
            message:'logout successfully.'
        });
        
    } catch (error) {
        console.error(error + 'logoutController');
        res.status(500).json({
            message:'internal server error in logoutController'
        })
    }    
}


exports.profileController = async (req,res) =>{
    try {
        
        const id = req?.user?.id;

        const user = await userModel.findById(id);

        if(!user){
            return res.status(404).json({
                message:'user not found.'
            });
        }

        res.status(200).json({
            message:'profile access successfully.',
            user
        })

    } catch (error) {
        console.error(error + 'profileController');
        res.status(500).json({
            message:'internal server error in profileController'
        });
    }
}

exports.updateProfileController = async (req,res) =>{

    try {
     
        const {name,email,password} = req?.body;
        const avtarFile = req?.files?.avtar?.[0];
        const resumeFile = req?.files?.resumeFile?.[0];

        let avtarResult;
        let resumeResult;

        const id = req?.user?.id;

        const user = await userModel.findById(id);

        if(!user){
            return res.status(404).json({
                message:'user not found.'
            });
        }

        if(avtarFile){
            avtarResult = await uploadFile(avtarFile.buffer,"image");
        }

        if(resumeFile){
            resumeResult = await uploadFile(resumeFile.buffer,"raw");
        }

        if(name !== undefined) user.name = name;
        if(email !== undefined) user.email = email;

        
        if(avtarResult !== undefined) user.avtar = avtarResult.secure_url;
        if(resumeResult !== undefined) user.resumeFile = resumeResult.secure_url;

        if(password){
            user.password = await bcrypt.hash(password,10);
        }

        await user.save();

        const updatedUser = user.toObject();

        delete updatedUser.password




    } catch (error) {
        console.error(error + 'updateProfileController');
        res.status(500).json({
            message:'internal server error in updateProfileController.'
        })
    }

}