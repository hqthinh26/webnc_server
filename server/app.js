const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.get("/", ( req, res ) => {
    res.status(200).send("This is server :)");
})

app.use('/api/account', require("./modules/account/account.routes"));


//Global Error Handler
app.use((err, req, res, next) => {
  res.status( err.httpCode || 400 ).send({
    code: err.httpCode || 400,
    error: err.error === undefined ? true : err.error,
    message: err.message || `Something broken !! Reported By Express Built-in Error Handler \n ${JSON.stringify(err)}`,
    data: err.data || null,
  });
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`)
});