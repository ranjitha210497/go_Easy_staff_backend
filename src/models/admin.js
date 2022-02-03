const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    workId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        max: 6
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin'
    },
    contactNumber: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true});

    adminSchema.virtual('password')
        .set(function(password) {
            this.hash_password = bcrypt.hashSync(password, 10);  
        });

    adminSchema.virtual('fullName')
        .get(function() {
            return `${this.firstName} ${this.lastName}`;
        })
    adminSchema.methods = {
        authenticate: function(password){
            return bcrypt.compareSync(password, this.hash_password);
        }
    }

module.exports = mongoose.model('Admin', adminSchema);