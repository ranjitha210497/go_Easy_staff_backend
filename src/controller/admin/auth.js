const Admin = require("../../models/admin");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    console.log("hi");
    Admin.findOne({ username: req.body.username })
    .exec((error, admin) => {
        if(admin) return res.status(400).json({
            message: 'Admin already registered'
        });

        const { 
            firstName,
            lastName,
            workId,
            username,
            contactNumber,
            password
        } = req.body;
        const _admin = new Admin({ 
            firstName, 
            lastName, 
            workId,
            username,
            contactNumber,
            password,
            role: 'admin' 
        });
        _admin.save((err, data) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    error: err
                })
            } 
            if(data) {
                res.setHeader('Access-Control-Allow-Origin', '*')
                console.log(data);
                return res.status(201).json({
                    message: 'Admin created successfully...!'
                })
            }
        })
    })
}

exports.signin = (req, res) => {
    Admin.findOne({ username: req.body.username })
        .exec((error, admin) => {
            if(error) return res.status(400).json({error});
            if(admin) {
                if(admin.authenticate(req.body.password) && admin.role === 'admin') {
                    const { _id, firstName, lastName, username, role, workId, contactNumber, fullName } = admin;
                    res.status(200).json({
                        admin: {
                            _id, firstName, lastName, username, role, workId, fullName, contactNumber
                        }
                    })
                } else {
                    return res.status(400).json({ message: 'Invalid password'});
                }
            } else {
                res.status(400).json({ message: 'Admin not found'});
            }
        })
}

exports.requireSignup = (req, res, next) => {
    Admin.findOne({ workId: req.body.workId})
        .exec((error, admin) => {
            if(admin)
                next();
            else return res.status(400).json({ error: "Work not found"})
        })
}
