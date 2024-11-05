const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/MNNITHub")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));
app.post("/LoginUser", (req, res) => {
  const { email, password } = req.body;
  console.log("Email received:", email);

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              res.json({
                success: true,
                message: "Successfully logged in",
                user: user.name,
              });
            } else {
              res.json({ success: false, message: "Incorrect password" });
            }
          })
          .catch((err) => {
            console.error("Error comparing passwords:", err);
            res
              .status(500)
              .json({ success: false, message: "Login error", error: err });
          });
      } else {
        res.json({ success: false, message: "User not registered" });
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res
        .status(500)
        .json({ success: false, message: "Login error", error: err });
    });
});
app.post("/RegUser", (req, res) => {
    const { name, email, password } = req.body;
  
    userModel.findOne({ email: email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ success: false, message: "User already registered" });
        }
        return bcrypt.hash(password, 10).then(hash => {
          return userModel.create({ name, email, password: hash });
        });
      })
      .then(user => {
        const userResponse = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        return res.status(201).json({ success: true, user: userResponse }); 
      })
      .catch(err => {
        console.error("Error creating user:", err);
        if (!res.headersSent) { 
          res.status(500).json({ success: false, message: "Failed to create user", error: err.message });
        }
      });
  });
  
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
