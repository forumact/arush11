var mongoose = require("mongoose");
var MyMatchSchema = new mongoose.Schema({
    matchid: String,
    userid: String,
    team1: {
        type: String,
        lowercase: true,
    },
    team1img: String,
    team2: {
        type: String,
        lowercase: true,
    },
    team2img: String,
    captainteam: {
        type: String,
        lowercase: true,
    },
    vicecaptainteam: {
        type: String,
        lowercase: true,
    },
    captainchoice: [],
    vcaptainchoice: [],
    teamcount: {
        type: String,
        default: "0",
        required: true,
    },
    status: {
        type: String,
        enum: ['INC', 'WIP', 'C'],
        default: "INC",
        required: true,
    },
    combination: [],
    partition: [],
    players: [],
    pointsstart: String,
    pointsend: String,
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
});
module.exports = mongoose.model("RA11_MyMatch", MyMatchSchema);