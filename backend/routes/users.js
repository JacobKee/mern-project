const router = require('express').Router();
let User = require('../models/user.models');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ') + err)
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const age = req.body.age;
    const race = req.body.race;
    const newUser = new User({username,age,race});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router