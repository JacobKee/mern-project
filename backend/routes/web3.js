const router = require("express").Router();
let fetch = require("node-fetch");
var Web3 = require("web3");
var _myAddress = "0x8966aAb17B17abb0Cd216f7Db59a0cEe9E9fc191";

require("dotenv").config();
var _tokens = [];

const ABIJson = [
  {
    constant: true,
    name: "bnb",
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    payable: false,
    type: "function",
  },
];
const getNetwork = async () => {
  return await fetch("http://localhost:8888/network")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
};

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
    getNetwork()
      .then(async (networks) => {
        for (let network of networks) {
          var web3 = new Web3(network.url);
          var balance = await web3.eth.getBalance(_myAddress);
          web3.utils.fromWei(balance, "ether");
          array.push({
            balance: web3.utils.fromWei(balance, "ether"),
            name: network.token,
            chain: network.name,
            main: true,
          });
        }
      })
      .then(() => {
        getToken().then(async (tokens) => {
          for (let token of tokens) {
            var web3 = new Web3(token.chain_id.url);
            const contract = new web3.eth.Contract(ABIJson, token.address);
            var balance = await contract.methods.balanceOf(_myAddress).call();
            array.push({
              balance: web3.utils.fromWei(balance, "ether"),
              name: token.name,
              chain: token.chain_id.name,
              main: false,
            });
          }
          res.json(sortArray(array));
        });
      });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/network").get((req, res) => {
  var array = [];
  try {
    getNetwork().then(async (networks) => {
      console.log(networks);
      res.json([]);
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

const sortArray = (array) => {
  array.sort(function (a, b) {
    const nameA = a.chain.toUpperCase(); // ignore upper and lowercase
    const nameB = b.chain.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return array
}

module.exports = router;
