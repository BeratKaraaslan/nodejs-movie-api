const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        unique: true
    },
    password: {
        type: String,
        
        minlength: 4
    }
});

module.exports = mongoose.model('user', UserSchema);