const config = require("config");
const chalk = require("chalk");
// const DreamTeam = require('../models/RA11_DreamTeam');
var _ = require("lodash");
const { query } = require("express");
const log = console.log;

/**
 *
 * @param {*} array
 * @param {*} key
 * @returns
 */
function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
            [obj[key]]: (hash[obj[key]] || []).concat(obj),
        });
    }, {});
}

/**
 *
 * @param {*} obj
 * @returns
 */
function objectToQueryString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(p + "=" + obj[p]);
        }
    return str.join("&");
}

/**
 *
 * @param {*} o
 * @returns
 */
function sortObjectByKeys(o) {
    return Object.keys(o)
        .sort()
        .reduce((r, k) => ((r[k] = o[k]), r), {});
}

/**
 *
 * @param {*} x
 * @param {*} y
 * @returns
 */
const isArrayEqual = function (x, y) {
    return _(x).xorWith(y, _.isEqual).isEmpty();
};

const filterCombo = async (query) => {
    const comboArray = [];
    for (var attributename in query) {
        if (attributename.match("combo")) {
            comboArray.push(query[attributename].split("_").map(Number));
        }
    }
    return comboArray;
};

const filterPartition = async (query) => {
    const PartitionArray = [];
    for (var attributename in query) {
        if (attributename.match("partition")) {
            PartitionArray.push(query[attributename].split("_").map(Number));
        }
    }
    return PartitionArray;
};

const preparePassData = async (cookies, query, combo, partition) => {
    let {
        nt,
        points_start,
        points_end,
        np,
        team1,
        team2,
        matchid,
        save,
        wp,
        pr,
        cp,
        vcp,
    } = query;
    let passdata = {
        userid: cookies ? cookies.user_id : 0,
        nt: nt,
        np: np,
        combo: combo,
        partition: partition,
        points_start: points_start,
        points_end: points_end,
        team1: team1,
        team2: team2,
        matchid: matchid,
        save: save,
        wp: wp,
        pr: pr,
        cp: cp,
        vcp: vcp,
    };

    return passdata;
};

const createPlayerPointsJson = async ({ matchid, response_filtered }) => {
    var obj = {};

    const fs = require("fs");
    var dir = './score';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let fpath = "./score/" + matchid + ".json";
    if (fs.existsSync(fpath)) {
        // console.log("file already exists");
    } else {
        var mapped = _.map(response_filtered, _.partialRight(_.pick, ["_id"]));
        for (const [key, value] of Object.entries(mapped)) {
            let val = value._id;
            obj[val] = 0;
        }
        let final = { Score: obj };
        fs.writeFile(fpath, JSON.stringify(final, null, 2), (err) => {
            if (err) throw err;
        });
    }
    return true;
};

// Meethod export to use other modules
// module.exports.teamGenerator = teamGenerator;
module.exports.groupByKey = groupByKey;
module.exports.objectToQueryString = objectToQueryString;
module.exports.sortObjectByKeys = sortObjectByKeys;
module.exports.filterCombo = filterCombo;
module.exports.filterPartition = filterPartition;
module.exports.preparePassData = preparePassData;
module.exports.createPlayerPointsJson = createPlayerPointsJson;
