/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config(); // ✅ Must be before process.env usage

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

import userRoute from "./routes/userRoutes.js";
import clubRoute from "./routes/clubRoute.js";
import adminRoute from "./routes/adminRoutes.js";
import requestRoute from "./routes/requestsRoute.js";
import announcementRoutes from "./routes/announcements.js";
import router from "./routes/oAuthRoutes.js";
import connectDB from "./db_connect.js";

const app = express();
const PORT = process.env.PORT ;
app.use(express.json());

// CORS
const corsOption = {
  origin: process.env.VITE_FRONTEND_BASE_URL,
  credentials: true,
};
app.use(cors(corsOption));

// Session middleware
app.use(
  session({
    // eslint-disable-next-line no-undef
    secret: process.env.JWT_SECRET || "fallback_secret", // fallback is optional
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
connectDB().then(() => {
  app.use("/api/user", userRoute);
  app.use("/api", clubRoute);
  app.use("/api", adminRoute);
  app.use("/api/request", requestRoute);
  app.use("/api/auth", router);
  app.use("/api/announcements", announcementRoutes);

  app.listen(`${PORT}`, () => {
    console.log(`Server is running on port ${PORT}`);
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
