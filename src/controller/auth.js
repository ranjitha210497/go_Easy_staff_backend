const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName })
    .exec((error, user) => {
        if(user) 
            return res.status(200).json({ message: "User already registered!"})
        const { 
            firstName,
            lastName,
            workId,
            contactNumber,
        } = req.body;
        const _user = new User({ 
            firstName, 
            lastName, 
            workId,
            contactNumber,
        });
        _user.save((err, data) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            } 
            if(data) {
                return res.status(201).json({
                    message: 'User created successfully...!'
                })
            }
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName })
        .exec((error, user) => {
            if(error) return res.status(400).json({error: 'User not found!'});
            if(user) {
                    const { _id, firstName, lastName, role, fullName } = user;
                    res.status(200).json({
                        user: {
                            _id, firstName, lastName, role, fullName
                        }
                    })
                } else {
                    return res.status(400).json({ message: 'User not found'});
                }
        })
}
