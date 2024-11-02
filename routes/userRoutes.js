// userRoutes.js
const express = require('express');
const userController = require('../contollers/userController');

const userRouter = express.Router();

// Route to get all users
userRouter.get('/', userController.getAllUsers);

// Route to create a new user
userRouter.post('/', userController.createUser);

// Route to get a specific user by ID
userRouter.get('/:id', userController.getUser);

// Route to update a specific user by ID
userRouter.patch('/:id', userController.updateUser);

// Route to delete a specific user by ID
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
