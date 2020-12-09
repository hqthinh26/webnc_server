const services = require("./account.services");
const db = require('../../db');

exports.addNewAccount = async function (req, res) {
  try {
    const { account_name, pw, full_name } = req.body;

    console.log(req.body);

    await services.addNewAccount(req.body);
    res.status(200).send({ message: "thanh cong" });
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.getList = async (req, res) => {
  try {
    const data = await db("account").select("account.*");
    res.status(200).send({data});
  } catch (e) {
    res.send(400).send({ e });
  }
};
