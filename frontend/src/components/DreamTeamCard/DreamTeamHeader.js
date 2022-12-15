import React from 'react'

export default function DreamTeamHeader({ teambyrole, team1, team2, tnumber }) {

  function teamPlayercount(players, teamname) {
    let teamPlayercount = [];
    const counts = {};

    if (typeof players['WK'] != "undefined") {
      players['WK'].map((player, index) => (
        teamPlayercount.push(player['team'])
      ));
    }

    if (typeof players['WK'] != "undefined") {
      players['BAT'].map((player, index) => (
        teamPlayercount.push(player['team'])
      ));
    }

    if (typeof players['WK'] != "undefined") {
      players['AR'].map((player, index) => (
        teamPlayercount.push(player['team'])
      ));
    }

    if (typeof players['WK'] != "undefined") {
      players['BOWL'].map((player, index) => (
        teamPlayercount.push(player['team'])
      ));
    }

    for (const num of teamPlayercount) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return counts[teamname];
  }

  function credits(players) {

    let credits = [];
    let sum = 0;

    if (typeof players['WK'] != "undefined") {
      players['WK'].map((player, index) => (
        credits.push(player['credits'])
      ));
    }

    if (typeof players['WK'] != "undefined") {

      players['BAT'].map((player, index) => (
        credits.push(player['credits'])
      ));
    }

    if (typeof players['WK'] != "undefined") {
      players['AR'].map((player, index) => (
        credits.push(player['credits'])
      ));
    }

    if (typeof players['WK'] != "undefined") {
      players['BOWL'].map((player, index) => (
        credits.push(player['credits'])
      ));
    }
    // Running the for loop
    for (let i = 0; i < credits.length; i++) {
      sum = parseFloat(sum, 10) + parseFloat(credits[i], 10);
    }
    return sum;
  }

  function points(players) {
    let points = [];
    let sum = 0;
    if (typeof players['WK'] != "undefined") {
      players['WK'].map((player, index2) => {
        let points = player['points'];
        if (player['captain'] === 'active') {
          points = player['points'] * 2;
        }
        if (player['vcaptain'] === 'active') {
          points = player['points'] * 1.5;
        }
        sum = parseFloat(sum, 10) + parseFloat(points, 10);

      });
    }

    if (typeof players['WK'] != "undefined") {
      players['BAT'].map((player, index2) => {
        let points = player['points'];
        if (player['captain'] === 'active') {
          points = player['points'] * 2;

        }
        if (player['vcaptain'] === 'active') {
          points = player['points'] * 1.5;
        }
        sum = parseFloat(sum, 10) + parseFloat(points, 10);
      });
    }

    if (typeof players['WK'] != "undefined") {
      players['AR'].map((player, index2) => {
        let points = player['points'];
        if (player['captain'] === 'active') {
          points = player['points'] * 2;
        }
        if (player['vcaptain'] === 'active') {
          points = player['points'] * 1.5;
        }
        sum = parseFloat(sum, 10) + parseFloat(points, 10);

      });
    }

    if (typeof players['WK'] != "undefined") {
      players['BOWL'].map((player, index2) => {
        let ppoints = player['points'];
        if (player['captain'] === 'active') {
          ppoints = player['points'] * 2;
        }
        if (player['vcaptain'] === 'active') {
          ppoints = player['points'] * 1.5;
        }        
        sum = parseFloat(sum, 10) + parseFloat(ppoints, 10);
      });
    }
    console.log(sum);
    return sum ? sum : 0;
  }

  function getTeamNumber(players, tnumber) {

    if (players && typeof players['WK'] != "undefined") {
      if (players['WK'][0].teamnumber) {
        return players['WK'][0].teamnumber + 1
      } else {
        return tnumber + 1;
      }
    } else {
      return tnumber + 1;
    }

  }

  return (
    <div className="d-flex justify-content-between bg-trans bg-success p-1 text-dark bg-opacity-50 align-items-baseline">
      <div className="p-1">
        <div className="d-inline-block text-uppercase badge fs-7 bg-white text-dark">
          {team1}
        </div>
        <span className="text-bold text-white fw-600 badge">
          {teamPlayercount(teambyrole ? teambyrole : [], team1)}: {teamPlayercount(teambyrole ? teambyrole : [], team2)}
        </span>
        <div className="d-inline-block text-uppercase badge fs-7 bg-dark">
          {team2}
        </div>
      </div>
      <div className="p-1 bg-dark badge">T-{getTeamNumber(teambyrole, tnumber)}</div>
      <div className="p-1">
        <div className="d-inline-block fs-7 badge">CR</div>
        <span className="text-white badge fs-7 bg-danger">{credits(teambyrole ? teambyrole : [])}</span>
        <div className="d-inline-block fs-7 badge">PTs</div>
        <span className="text-white badge fs-7 bg-danger">{points(teambyrole ? teambyrole : [])}</span>
      </div>
    </div>
  )
}
