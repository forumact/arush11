import React, { useEffect } from "react";
import _ from "lodash";
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlaying11 } from '../features/playing11/playing11Slice';
import { useDispatch, useSelector } from "react-redux";

import ground from "../team-bg.jpg";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import PlayerPreview from "../components/PlayerPreview/PlayerPreview";


export default function Captains() {
  const ra11Playing11 = useSelector((store) => store.playing11);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const { matchid, user_id, team1, team1img, team2, team2img } = location.state;

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  let team1players = _.values(_.get(ra11Playing11.playing11, ['teamrole1']));
  let team2players = _.values(_.get(ra11Playing11.playing11, ['teamrole2']));

  useEffect(() => {
    dispatch(getPlaying11({ team1, team2, matchid }))
  }, [])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    navigate('/prediction', { state: { matchid: matchid, user_id: user_id, team1: team1, team2: team2, team1img: team1img, team2img: team2img } });
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
          {ra11Playing11.loading ? <Loader /> : renderCard2(team1, team1img)}

        </div>
        <div className="col-md-6 mt-3 mb-3">
          {ra11Playing11.loading ? <Loader /> : renderCard2(team2, team2img)}
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
