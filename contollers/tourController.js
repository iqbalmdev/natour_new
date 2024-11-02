const Tours = require('../models/tourModel');
// tourController.js

// const toursFilePath = path.join(
//   __dirname,
//   '../dev-data/data/tours-simple.json',
// ); // Correct the path
exports.getAllTours = async (req, res) => {
  // Ensure data is fresh

  try {
    // const tours = await Tours.find({
    //   difficulty: 'easy',
    //   duration: 5,
    // });

    const tours = await Tours.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error in getting tour',
      data: {
        err,
      },
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const tour = await Tours.create(...req.body);
    res.status(201).json({
      status: 'Tour created',
      data: {
        tour,
      },
    });
  } catch (Err) {
    res.status(400).json({
      status: 'Error in creating tour',
      data: {
        Err,
      },
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tours.findById();
    res.status(201).json({
      status: 'Tour created',
      data: {
        tour,
      },
    });
  } catch (Err) {
    res.status(400).json({
      status: 'Error in creating tour',
      data: {
        Err,
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      //   tour,
    },
  });
};

exports.updateTour = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        //   tour: updatedTour,
      },
    });
  } catch (Err) {
    res.status(400).json({
      status: 'success',
      data: {
        //   tour: updatedTour,
      },
    });
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
