const router = require('express').Router();
var Web3 = require('web3');
var url = 'https://bsc-dataseed1.binance.org:443'
var address = '0x8966aAb17B17abb0Cd216f7Db59a0cEe9E9fc191'

var web3 = new Web3(url)

const tokens = [
    { address: '0x9a980a084D8D72B219e1C79d91faf06Bec874D51', name: 'ANON' },
    { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', name: 'BNB' }
];


router.route('/').get(async (req, res) => {
    var array = []
    try {
        for (let token of tokens) {
            const abiJson = [
                { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" },
            ];
            const contract = new web3.eth.Contract(abiJson, token.address);
            const balance = await contract.methods.balanceOf(address).call();
            array.push({ balance: web3.utils.fromWei(balance, 'ether'), name: token.name });
        }
        res.json(array);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router