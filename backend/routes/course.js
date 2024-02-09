const express = require('express');
const router = express.Router();
const Course = require('../models/course');


router.post('/', async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const course = new Course({
      title,
      description,
      instructor,
      price
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        instructor,
        price
      },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndRemove(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
