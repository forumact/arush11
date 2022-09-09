import React, { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ground from "../team-bg.jpg";
import { getSquad, selectAllPlayers } from '../features/squad/squadSlice';
import Loader from "../components/Loader";
import PlayerPreview from "../components/PlayerPreview/PlayerPreview";

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
    navigate('/playing-11', {
      state: {
        matchid: matchid,
        user_id: user_id, team1: team1, team2: team2,
        team1img: team1img, team2img: team2img
      }
    });
  }

  const renderCard = (team, img) => team1players.map(teambyrole => (
    <PlayerPreview teambyrole={teambyrole} team={team} img={img} bgimgStyle={bgimgStyle} />
  ));


  const renderCard2 = (team, img) => team2players.map(teambyrole => (
    <PlayerPreview teambyrole={teambyrole} team={team} img={img} bgimgStyle={bgimgStyle} />
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
