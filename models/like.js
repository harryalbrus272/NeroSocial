const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    //this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of the liked object sinces this is a dynamic reference
    onModel:{
        type:String,
        required : true,
        //we can remove enum. But this is defined that only post and comments can be entered here.
        enum: ['Post','Comment'],
    }
},{
    timestamps: true,
});

const Like = mongoose.model('like' , likeSchema);
module.exports =Like;