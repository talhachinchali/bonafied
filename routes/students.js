const express = require('express');
const Student = require('../models/student');
const router = express.Router();

router.get('/students', async (req, res) => {
  res.send("hello");});
router.post('/students', async (req, res) => {
  const student = new Student({
    rollNumber: req.body.rollNumber,
    name: req.body.name,
    address: req.body.address
  });

  try {
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/students/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    res.json(student);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
