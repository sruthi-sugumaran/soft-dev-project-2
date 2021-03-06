const mongoose = require("mongoose"); // require mongoose

const Schema = mongoose.Schema;

const courseSchema = new Schema( // creating new schema
  {
    // Properties with validations
    name: { type: String, trim: true, minlength: 3, required: true },
    status: { type: Boolean, required: true, default: true },
    code: { type: String, required: true },
    //Edited by Sruthi ---- starts here
    classlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    //Edited by Sruthi ---- starts here
    assignments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assignment"
      }
    ]
  },
  {
    timestamps: true // automatically manages timestamp, when created the record
  }
);

const Course = mongoose.model("Course", courseSchema); // attaching model name with schema

module.exports = Course; // exporting model
