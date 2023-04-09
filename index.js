const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./models/student');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to database');
})
.catch((error) => {
  console.log(`Error connecting to database: ${error}`);
});
app.get("/abc",(req,res)=>{
  res.send("abc");
})


app.put('/students/year/:year', async (req, res) => {
  try {
    const students = await Student.find({ year: req.params.year });
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No student record found for the given year' });
    }

    students.forEach((student) => {
      student.year = req.body.year3;
      student.save();
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


app.put('/students/academic_year/:academicyear', async (req, res) => {
  try {
    const students = await Student.find({ academic_year: req.params.academicyear });
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No student record found for the given year' });
    }

    students.forEach((student) => {
      student.academic_year = req.body.academicyear3;
      student.save();
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


app.put('/students/failyear/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.year = req.body.failedyear3;
    const updatedStudent = await student.save();

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


app.post('/students', async (req, res) => {
  const student = new Student({
    rollNumber: req.body.rollNumber,
    name: req.body.name,
    branch: req.body.branch,
    year:req.body.year,
    academic_year:req.body.academic_year,
    gender:req.body.gender,
    fathername:req.body.fathername,
    mothername:req.body.mothername,
    tos:req.body.tos,
    course:req.body.course
  });
  try {
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get('/students/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    res.json(student);
  } catch (error) {
    res.json({ message: error });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
