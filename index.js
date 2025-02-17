const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./db');
const cors = require('cors');
const User = require('./usermodel');

connectDB();
app.use(cors());
app.use(express.json());

// Get all users
app.get('/', async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new user
app.post('/createUser', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating user' });
    }
});

// Get a user by ID
app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid user ID' });
    }
});

// Update a user by ID
app.put('/updateUser/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid user ID or request body' });
    }
});

// Delete a user by ID
app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid user ID' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
