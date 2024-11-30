const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['admin', 'organisation', 'doner', 'hospital'],
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'doner' || this.role === 'admin') {
                return true;
            }
            return false;
        }
    },
    organisationName: {
        type: String,
        required: function () {
            if (this.role === 'organisation') {
                return true;
            }
            return false;
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === 'hospital') {
                return true;
            }
            return false;
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Enforces uniqueness for email addresses
        lowercase: true, // Automatically convert email to lowercase
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        unique: true, // Enforces uniqueness for address field
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true, // Enforces uniqueness for phone number
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
