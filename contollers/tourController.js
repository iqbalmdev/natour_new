const Tours = require('../models/tourModel');
// tourController.js

// const toursFilePath = path.join(
//   __dirname,
//   '../dev-data/data/tours-simple.json',
// ); // Correct the path
exports.getAllTours = async (req, res) => {
  try {
    // Clone and filter out excluded fields
    // 1A filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    //1B advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g,(match)=>`$${match}`)
    // Parse the modified query string back into an object
    const mongoQuery = JSON.parse(queryStr);

    // Execute query with transformed object
    let query = Tours.find(mongoQuery); 
    // This line does not perform any database operation at this point. It only creates a Mongoose query object, which represents the query configuration.
    //You can think of this as setting up a recipe without actually starting to cook. The database interaction happens only when you use await (or .then()) on the query, as that triggers Mongoose to send the query to the MongoDB server.

    // sorting by values
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy)
    }else{
      query = query.sort('-createdAt')
    }

    // limit the query by fields
    if(req.query.fields){
      const selectBy = req.query.fields.split(',').join(' ');
      query = query.select(selectBy)
    }else{
      query = query.select('-v')
    }

    // pagination
    // ?page=1&limit=10

    const page = parseInt(req.query.page, 10) || 1; // Default page to 1
    const limit = parseInt(req.query.limit, 10) || 100; // Default limit to 100
    const skip = (page - 1) * limit;


    query = query.skip(skip).limit(limit)

    if(req.query.page){
      const tourCount = await Tours.countDocuments();
      if(page >tourCount ){
        throw new Error("Page does not exists")
      }
    }
    // Send the response
    const tours = await query
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
        err: err.message,
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
