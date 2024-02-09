import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEditCourse = (id) => {
    
    console.log('Edit course:', id);
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/course/${id}`);
      fetchCourses(); 
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container">
      <h2>Course List</h2>
      {courses.map((course) => (
        <div className="course-card" key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p className="instructor">Instructor: {course.instructor}</p>
          <p className="price">Price: ${course.price}</p>
          <div className="actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
