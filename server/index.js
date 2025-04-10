import express from "express";
import cors from "cors";
import userRoute from "../server/routes/userRoutes.js";
import  clubRoute from "../server/routes/clubRoute.js"
import connectDB from "./db_connect.js";
import adminRoute from "../server/routes/adminRoutes.js"
import { requestToJoinClub } from "./controllers/clubController/joinClubRequest.js";
import announcementRoutes from "../server/routes/announcements.js"
const app = express();

// Middleware should be before routes
app.use(express.json());

// CORS configuration
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

// Connect to DB and start server
connectDB().then(() => {
  app.use("/api/user", userRoute);
  app.use("/api/joinClub", requestToJoinClub)
  app.use("/api", clubRoute)
  app.use("/api",adminRoute)
  app.use("/api/announcements", announcementRoutes)
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});





/*app.post("/LoginUser", (req, res) => {
  const { email, password } = req.body;
  console.log("Email received:", email);

  User
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
  
    User.findOne({ email: email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ success: false, message: "User already registered" });
        }
        return bcrypt.hash(password, 10).then(hash => {
          return User.create({ name, email, password: hash });
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
  */
