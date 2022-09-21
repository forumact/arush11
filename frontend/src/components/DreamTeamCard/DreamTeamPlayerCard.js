import React from "react";

import { splitName, printCaptain, printVcaptain, teamClass } from '../../utils';

import playerImg from './t1.png';



export default function DreamTeamPlayerCard({ player, team1, team2 }) {

  let captainsMark = printCaptain(player.captain ? player.captain : null);
  let vicecaptainsMark = printVcaptain(player.vcaptain ? player.vcaptain : null);


  function points(players) {
    let points = 0;
    points = player['points'];
    if (player['captain'] === 'active') {
      points = player['points'] * 2;
    }
    if (player['vcaptain'] === 'active') {
      points = player['points'] * 1.5;
    }
    return points;

  }

  return (
    <div className={`position-relative d-inline-block ${teamClass(player.team, team1, team2)}`}>
      {captainsMark ? <span dangerouslySetInnerHTML={{ __html: captainsMark }}></span> : ''}
      {vicecaptainsMark ? <span dangerouslySetInnerHTML={{ __html: vicecaptainsMark }}></span> : ''}
      <img src={playerImg} width="60" height="60" alt="" />
      <div className="pname fw-600 Tooltip-Wrapper fw-500" title={player.name}>{splitName(player.name)}</div>
      <div className="bg-dark1 ra-credits alert-link">
        {player.star === 'active' && <span className="dreampick">
          <i className="fa-solid fa-shield-heart"></i>
        </span>}
        <span className="me-xxl-1 text-white">{player.points ? points(player) : player.credits}</span>
      </div>
    </div>
  );
}
