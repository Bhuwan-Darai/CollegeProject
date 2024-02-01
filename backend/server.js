const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const routes = require("./route/routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//? Connect to MongoDB
connectDB();

//? Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(cookieParser()); //! remeber the order in vite for cookie else it will not save in browser
app.use(express.urlencoded({ extended: true }));

//? Rotes
app.get("/", (req, res) => res.send("Api running"));
// app.set("socketio", io);
app.use("/api", routes);

//? Error handling
app.use(notFound);
app.use(errorHandler);

//? Serve static files
app.use("/uploads", express.static("uploads"));

//? Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
