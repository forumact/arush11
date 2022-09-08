var mongoose = require("mongoose");
var PlayerSchema = new mongoose.Schema({
    pid: String,
    name: String,
    role: String,
    picture: String,
    team: {
        type: String,
        lowercase: true,
    },
    credits: Number,
    status: String,
    star: String,
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
});

module.exports = mongoose.model("RA11_Player", PlayerSchema);