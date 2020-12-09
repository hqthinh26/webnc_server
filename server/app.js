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

app.use('/account', require('./modules/account/account.routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`)
});