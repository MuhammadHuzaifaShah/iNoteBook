const { paste } = require('@testing-library/user-event/dist/paste');
const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.export=mongoose.model('user',UserSchema);