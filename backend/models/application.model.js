const { default: mongoose} = require("mongoose");

const applicationSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true
    },
    status:{
        type:String,
        enum:['pending','rejected','accepted'],
        default:'pending'
    }

},{timestamps:true});

const applicationModel = mongoose.model('application',applicationSchema);

module.exports = applicationModel;