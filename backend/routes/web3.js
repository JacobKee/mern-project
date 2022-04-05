const router = require("express").Router();
let fetch = require("node-fetch");
var Web3 = require("web3");
var _myAddress = "0x8966aAb17B17abb0Cd216f7Db59a0cEe9E9fc191";

var _tokens = [];

const ERCJson = [
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const BNBJson = [
  // balanceOf
  {
    constant: true,

    inputs: [{ name: "_owner", type: "address" }],

    name: "balanceOf",

    outputs: [{ name: "balance", type: "uint256" }],

    type: "function",
  },
];
const getToken = async () => {
  return await fetch("http://localhost:8888/token")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
};

router.route("/").get((req, res) => {
  var array = [];
  try {
    getToken().then(async (tokens) => {
      for (let token of tokens) {
        var web3 = new Web3(token.chain_id.url);
        // if (token.chain_id.name === "ERC") {
        //   const contract = new web3.eth.Contract(ERCJson, token.address);
        //   var balance = await contract.methods.balanceOf(_myAddress).call();
        //   array.push({
        //     balance: balance,
        //     name: token.name,
        //   });
        // } else 
        if (token.chain_id.name === "BNB") {
          const contract = new web3.eth.Contract(BNBJson, token.address);
          var balance = await contract.methods.balanceOf(_myAddress).call();
          array.push({
            balance: balance,
            name: token.name,
          });
        } else{
             var balance = await web3.eth.getBalance(_myAddress);
             array.push({
               balance: web3.utils.fromWei(balance, "ether"),
               name: token.name,
             });
        }
      }
      res.json(array);
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
module.exports = router;
