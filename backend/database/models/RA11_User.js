var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    email: {
        type: String,
        lowercase: true,
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
    status: {
        type: String,
        enum: ['A', 'D'],
        default: "D",
        required: true,
    },
});
module.exports = mongoose.model("RA11_User", UserSchema);