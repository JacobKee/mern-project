const router = require("express").Router();
let Token = require("../models/token.models");
let Network = require("../models/network.models");

router.route("/").get((req, res) => {
  Token.find()
    .populate("chain_id")
    .sort("chain_id")
    .then((tokens) => res.json(tokens))
    .catch((err) => res.status(400).json("Error: ") + err);
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const chain_id = req.body.chain_id;
  const newToken = new Token({ name, address, chain_id });

  newToken
    .save()
    .then(() => res.json("Token added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;
