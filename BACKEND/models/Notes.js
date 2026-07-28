const { paste } = require('@testing-library/user-event/dist/paste');
const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    tags:{
        type: String,
        default:'general'
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.export=mongoose.model('notes',NotesSchema);