const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user_routes");
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));

// Routes
app.use("/", userRoutes); // Use userRoutes for /api endpoint

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/reminder", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Call the connectDB function
connectDB();

// Default route
app.get("/", (req, res) => {
  res.type('html');
  res.send("<h1>Rohit Jha</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
