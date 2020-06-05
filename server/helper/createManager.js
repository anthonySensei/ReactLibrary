const User = require('../models/user');
const roles = require('../constants/roles');

const passwordGenerator = require('./generatePassword');

exports.createManager = () => {
    const manager = new User({
        email: process.env.MANAGER_EMAIL,
        password: passwordGenerator.cryptPassword(
            process.env.MANAGER_PASSWORD
        ),
        role: roles.MANAGER,
        active: true
    });
    return manager.save();
};
