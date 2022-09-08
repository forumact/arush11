var mongoose = require("mongoose");
var DreamTeamSchema = new mongoose.Schema({
    did: String,
    matchid: String,
    userid: String,
    teamnumber: Number,
    points_status: {
        type: String,
        enum: ['A', 'D'],
        default: "D",
        required: true,
    },
    players: [],
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
});
module.exports = mongoose.model("RA11_DreamTeam", DreamTeamSchema);