import React, { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import PlayersCard from "../components/Players/PlayersCard";
import ground from "../team-bg.jpg";
import GroundHeader from "../components/GroundHeader/GroundHeader";
import { getSquad, selectAllPlayers } from '../features/squad/squadSlice';
import Loader from "../components/Loader";

export default function Squads() {
  const ra11Squad = useSelector((store) => store.squad);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  const allPlayers = useSelector(selectAllPlayers);

  const { matchid, user_id, team1, team1img, team2, team2img } = location.state;

  let team1players = _.values(_.get(allPlayers, ['teamrole1']));
  let team2players = _.values(_.get(allPlayers, ['teamrole2']));

  useEffect(() => {
    document.title = 'Arush11 | Squad'
    dispatch(getSquad({ matchid, user_id, team1, team1img, team2, team2img }));
  }, [])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    navigate('/playing-11', { state: { matchid: matchid, user_id: user_id, team1: team1, team2: team2, team1img: team1img, team2img: team2img } });
  }

  const renderCard = (team, img) => team1players.map(teambyrole => (
    <section className="team-bg h-100" style={bgimgStyle}>
      <GroundHeader team={team} img={img} />
      <p className="text-white text-uppercase badge d-flex justify-content-center">
        Wicket-Keepers
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["WK"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Batters
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BAT"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        All-Rounders
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["AR"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Bowlers
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BOWL"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      {/* <div className="d-flex justify-content-center bg-trans bg-success p-1 bg-opacity-25">
          <div className="text-white mt-2 fs-6 badge">
            WK -1 BAT - 5 AR - 3 BOWL- 3
          </div>
        </div> */}
    </section>
  ));


  const renderCard2 = (team, img) => team2players.map(teambyrole => (
    <section className="team-bg h-100" style={bgimgStyle}>
      <GroundHeader team={team} img={img} />
      <p className="text-white text-uppercase badge d-flex justify-content-center">
        Wicket-Keepers
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["WK"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Batters
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BAT"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        All-Rounders
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["AR"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      <p className="text-white text-center text-uppercase badge d-flex justify-content-center">
        Bowlers
      </p>
      <div className="d-flex justify-content-center flex-wrap">
        {teambyrole &&
          teambyrole["BOWL"].map((player) => (
            <PlayersCard player={player} key={player.pid} />
          ))}
      </div>
      {/* <div className="d-flex justify-content-center bg-trans bg-success p-1 bg-opacity-25">
        <div className="text-white mt-2 fs-6 badge">
          WK -1 BAT - 5 AR - 3 BOWL- 3
        </div>
      </div> */}
    </section>
  ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mt-3 mb-3">
          {ra11Squad.loading ? <Loader /> : renderCard(team1, team1img)}
        </div>
        <div className="col-md-6 mt-3 mb-3">
          {ra11Squad.loading ? <Loader /> : renderCard2(team2, team2img)}
        </div>
        <div className="bg-dark p-2 d-flex justify-content-center mb-1">
          <Link to={-1} className="btn btn-danger text-dark mr-1">
            Back
          </Link>
          <button className="btn btn-success text-dark" onClick={formSubmitHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}
