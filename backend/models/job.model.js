const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
    company_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    jobType:{
        type:String,
        enum:['full time','internship'],
        required:true
    }
},{timestamps:true});

const jobModel = mongoose.model('job',jobSchema);

module.exports = jobModel;
