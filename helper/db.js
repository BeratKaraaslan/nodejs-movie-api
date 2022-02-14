const mongoose = require('mongoose');

module.exports = () => {
    mongoose.Promise = global.Promise;
};
