const express = require("express");
const { connectDB } = require("./config/db.config");
const router = require("./routes/User.Route");
const taskRouter = require("./routes/Task.Route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: `${process.env.ORIGIN}`,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// DB Connection
connectDB();

// routes
app.use(router);
app.use(taskRouter);

// check Authentication
app.get("/check-auth", (req, res) => {
  if (req.cookies.accessToken) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
