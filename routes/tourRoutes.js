// tourRoutes.js
const express = require('express');
const tourController = require('../contollers/tourController');

const router = express.Router();

const bodyCheckMiddleware = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      message: 'Invalid body',
    });
  }
  next();
};
// router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(bodyCheckMiddleware, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

module.exports = router;
