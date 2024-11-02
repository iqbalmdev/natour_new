const mongoose = require('mongoose');
// Replace with your MongoDB connection string
const fs = require('fs');
const Tour = require('../../models/tourModel');

const dbURI =
  'mongodb+srv://kathanipanpoli:natouriqbal@cluster0.ei5vc.mongodb.net/natour';

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
mongoose
  .connect(dbURI, {})
  .then(() => {
    console.log('DB connnected');
  })
  .catch((err) => {
    console.log(err);
  });

const importData = async () => {
  try {
    const tour = await Tour.create(tours);
    console.log(tour);
  } catch (Err) {
    return Err;
  }
};
const deleteData = async () => {
  try {
    const tour = await Tour.deleteMany();
    console.log(tour);
  } catch (err) {
    return err;
  }
};

if (process.argv[2] === '--import') {
  importData();
  // process.argv is the command use for running special command to run somethings --npm run dev --import
  // process.argv is the command use for running special command to run somethings --npm run dev --delete
}

if (process.argv[2] === '--delete') {
  deleteData();
}
