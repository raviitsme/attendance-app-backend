const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
    },
    date : {
        type : Date,
        required : true
    },
    records : [{
        student : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        status : {
            type : String,
            enum : ["present", "absent"],
            default : "absent",
            required : true
        }
    }]
}, { timestamps : true });

module.exports = mongoose.model('Attendace', attendanceSchema);