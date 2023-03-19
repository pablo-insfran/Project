const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    birthdate: {
        type: String,
        required: [true, "Age is required."]
    },
    profile:{
        type:String
    },
    subject: [
        {
            subject_name: {
                type: String,
                required: [true, "Subject Name is required."]
            },
            note: {
                type: Number,
                enum: [0, 1, 2, 3, 4, 5],
                required: [true, "Subject Note is required."]
            }
        }
    ]
},
    { timestamps: true }
)

const Students = mongoose.model("Students", StudentsSchema);

module.exports = Students;