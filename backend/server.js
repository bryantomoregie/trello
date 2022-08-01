const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(require("./routes"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/reactdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
