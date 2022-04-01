const router = require('express').Router();
var Web3 = require('web3');
var url = 'https://mainnet.optimism.io'
var address = '0x8966aAb17B17abb0Cd216f7Db59a0cEe9E9fc191'

var web3 = new Web3(url)

router.route('/').get(async (req, res) => {
    var array = []
    try {
        var balance = await web3.eth.getBalance(address)
        web3.utils.fromWei(balance,'ether')
        array.push({ balance: web3.utils.fromWei(balance, 'ether'), name: 'ETH' })
        res.json(array);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router