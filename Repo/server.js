const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/user", require("./routes/userRoutes"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server Running at ${process.env.NODE_MODE} Mode on ${process.env.PORT}`
      .bgCyan.white
  );
});
