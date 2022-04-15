const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDb = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;
connectDb();

const companyRoute = require("./routes/company");
const employeeContactRoute = require("./routes/employee");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//my routes
app.use("/api/company", companyRoute);
app.use("/api/employee", employeeContactRoute);

const server = app.listen(
  port,
  console.log(`server is running on port ${port}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`error:${err.message}`);
  server.close(() => process.exit(1));
});
