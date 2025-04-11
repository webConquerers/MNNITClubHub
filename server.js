// server.js
const express = require('express');
const connectDB = require('./db');
const clubRoutes = require('./routes/clubs');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/clubs', clubRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));