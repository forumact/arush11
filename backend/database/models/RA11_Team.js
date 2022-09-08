var mongoose = require("mongoose");
var TeamSchema = new mongoose.Schema({
    tmid: String,
    tournament_name: {
        type: String,
        lowercase: true,
    },
    teamname: {
        type: String,
        lowercase: true,
    },
    image: String,
    status: String,
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
});
module.exports = mongoose.model("RA11_Team", TeamSchema);