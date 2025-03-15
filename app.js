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
const ipMonitorRoutes = require("./routes/ipMonitor");

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.use(bodyParser.json());

// Routes
app.use("/v1/users/", authRoutes);
app.use("/ip-monitor", ipMonitorRoutes);

// Serve static files from public directory
app.use(express.static('public'));

// PORT
const port = process.env.PORT || 8080;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
