import React from 'react';
// import PlayersCard from "../Players/PlayersCard";
import DreamTeamHeader from "../DreamTeamCard/DreamTeamHeader";
import DreamTeamFooter from './DreamTeamFooter';
import DreamTeamPlayerCard from './DreamTeamPlayerCard';


export default function DreamTamPlayerPreview({ teambyrole, bgimgStyle, team1, team2, tnumber }) {

  // console.log(teambyrole)

  return (
    <section className="team-bg h-100" style={bgimgStyle}>
      <DreamTeamHeader teambyrole={teambyrole} team1={team1} team2={team2} tnumber={tnumber} />
      {/* <p className="text-white text-uppercase badge d-flex justify-content-center">
        Wicket-Keepers
      </p> */}
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["WK"]?.map((player, index) => (
            <DreamTeamPlayerCard player={player} key={index} team1={team1} team2={team2} />
          ))}
      </div>
      {/* <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Batters
      </p> */}
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BAT"]?.map((player, index) => (
            <DreamTeamPlayerCard player={player} key={index} team1={team1} team2={team2} />
          ))}
      </div>
      {/* <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        All-Rounders
      </p> */}
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["AR"]?.map((player, index) => (
            <DreamTeamPlayerCard player={player} key={index} team1={team1} team2={team2} />
          ))}
      </div>
      {/* <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Bowlers
      </p> */}
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BOWL"]?.map((player, index) => (
            <DreamTeamPlayerCard player={player} key={index} team1={team1} team2={team2} />
          ))}
      </div>
      {teambyrole && <DreamTeamFooter team={teambyrole} />}
    </section>
  )
}
