// server.js
import express from "express"
import connectDB from "./db.js"
import clubRoutes from "./server/routes/clubRoute.js"
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/clubs', clubRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));