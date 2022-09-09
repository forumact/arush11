import React from 'react';
import PlayersCard from "../Players/PlayersCard";
import GroundHeader from "../GroundHeader/GroundHeader";


export default function PlayerPreview({teambyrole, team, img, bgimgStyle}) {
  return (
    <section className="team-bg h-100" style={bgimgStyle}>
      <GroundHeader team={team} img={img} />
      <p className="text-white text-uppercase badge d-flex justify-content-center">
        Wicket-Keepers
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["WK"]?.map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Batters
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BAT"]?.map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        All-Rounders
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["AR"]?.map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Bowlers
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BOWL"]?.map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      {/* <div className="d-flex justify-content-center bg-trans bg-success p-1 bg-opacity-25">
          <div className="text-white mt-2 fs-6 badge">
            WK -1 BAT - 5 AR - 3 BOWL- 3
          </div>
        </div> */}
    </section>
  )
}
