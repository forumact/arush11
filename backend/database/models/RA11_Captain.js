var mongoose = require("mongoose");
var CaptinSchema = new mongoose.Schema({
    cid: String,
    matchid: String,
    user_id: String,
    name: String,
    teamname: {
        type: String,
        lowercase: true,
    },
    captain: String,
    vcaptain: String,
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
});
module.exports = mongoose.model("RA11_Captain", CaptinSchema);