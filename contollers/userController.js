// userController.js
const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '../dev-data/data/users.json'); // Correct path

let users = []; // Initial empty array to hold users

// Helper function to load users from JSON file
const loadUsers = () => {
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      console.error("Failed to load users", err);
      throw err;
    }
    users = JSON.parse(data.toString());
  });
};

// Load users initially
loadUsers();

exports.getAllUsers = (req, res) => {
    loadUsers(); // Ensure data is fresh
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
};

exports.createUser = (req, res) => {
    loadUsers(); // Reload to get the latest
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...req.body };
    users.push(newUser);

    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), err => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to create new user'
            });
        }

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    });
};

exports.getUser = (req, res) => {
    loadUsers(); // Reload for fresh data
    const id = parseInt(req.params.id, 10);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
};

exports.updateUser = (req, res) => {
    loadUsers(); // Reload for the current state
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), err => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to update user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    });
};

exports.deleteUser = (req, res) => {
    loadUsers(); // Refresh the data before manipulation
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    users.splice(userIndex, 1);

    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), err => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to delete user'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
};
