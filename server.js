// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const app = require('./app');

// Replace with your MongoDB connection string
const dbURI =
  'mongodb+srv://kathanipanpoli:natouriqbal@cluster0.ei5vc.mongodb.net/natour';

mongoose
  .connect(dbURI, {})
  .then(() => {
    console.log('DB connnected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log('App is running on port 5000');
});
