const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  name: { type: String, required: true },
  branch: { type: String },
  year: { type: String },
  academic_year: { type: String },
  gender: { type: String },
  fathername: { type: String },
  mothername: { type: String },
  tos: { type: String },
  course: { type: String }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
