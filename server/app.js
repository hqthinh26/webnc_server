const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { required } = require("joi");

const db = require("./db");

const auth = require("./middleware/auth.controllers");
const populateResponse = require("./response_handler");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const tokenServices = require("./modules/token/token.services");

app.get("/", (req, res) => {
  res.status(200).send("This is server :)");
});

//app.get("/api/is_token_valid", auth.isTokenValid);
app.use("/api/search", require("./utils/search/search.routes"));

app.get("/api/auth", auth.isAuthenticate, (req, res, next) => {
  next(populateResponse.success([], "Token hợp lệ"));
});

app.use("/api/account", require("./modules/account/account.routes"));
app.use(
  "/api/course_type",
  require("./modules/course_type/course_type.routes")
);
app.use("/api/course", require("./modules/course/course.routes"));
app.use(
  "/api/course_detail",
  require("./modules/course_detail/course_detail.routes")
);
app.use("/api/feedback", require("./modules/feedback/feedback.routes"));

//Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.httpCode || 400).send({
    code: err.code || 400,
    error: err.error === undefined ? true : err.error,
    message:
      err.message ||
      `Something broken !! Reported By Express Built-in Error Handler \n ${JSON.stringify(
        err
      )}`,
    data: err.data || null,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
