const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Connect to MongoDB
const connectDB = require('./config/mongodb');
connectDB();

// Routes
const authRoutes = require("./routes/auth");
const blockRoutes = require("./routes/block");

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.use(bodyParser.json());

// Routes
app.use("/api/v1/users/", authRoutes);
app.use("/api/block", blockRoutes);

// PORT
const port = process.env.PORT || 8080;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
