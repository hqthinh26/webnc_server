const express = require("express");

const app = express();

app.get("/", ( req, res ) => {
    res.status(200).send("This is server :)");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`)
});