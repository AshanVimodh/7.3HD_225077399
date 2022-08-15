const express = require("express");
const mongoose = require("mongoose");

const auth = require("./helpers/jwt.js");
const users = require("./controllers/UserController.js");
const posts = require("./controllers/PostController.js");
const errors = require("./helpers/errorHandler.js");

const app = express();
const cors = require("cors");
app.use(cors());

// middleware for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// middleware for listening to routes
app.use("/users", users);
app.use("/posts", posts);

// middleware for error responses
app.use(errors.errorHandler);

// MongoDB connection, success and error event responses
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/capstone?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongo at ${uri}`));

app.listen(3000);
