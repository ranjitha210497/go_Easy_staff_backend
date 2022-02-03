const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
        trim: true,
        min: 3,
        max: 6
    },
    role: {
        type: String,
        default: 'user'
    },
    contactNumber: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true});


    userSchema.virtual('fullName')
        .get(function() {
            return `${this.firstName} ${this.lastName}`;
        })

module.exports = mongoose.model('User', userSchema);