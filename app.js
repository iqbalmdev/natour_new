const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const morgan = require('morgan');
// const stackTrace = require('stack-trace');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//cstatic file middleware

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
