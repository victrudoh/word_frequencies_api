const path = require("path");

const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

const port = process.env.PORT || 4044;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.set("view engine", "ejs"); // template engine
app.set("views", path.join(__dirname, "/views")); // setting views directory
app.use(express.static(path.join(__dirname, "/public"))); // static files directory

const indexRouter = require("./routes/index.routes");

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
