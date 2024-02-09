const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const authRouter = require('./routes/auth');
const courseRouter = require('./routes/course')

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern_auth_course');
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


app.use('/auth', authRouter);
app.use('/course', courseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
