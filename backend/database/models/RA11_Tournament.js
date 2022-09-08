var mongoose = require("mongoose");
var TournamentSchema = new mongoose.Schema({
    tid: String,
    name: {
        type: String,
        lowercase: true,
    },
    status: String,
    createdAt: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
});
module.exports = mongoose.model("RA11_Tournament", TournamentSchema);