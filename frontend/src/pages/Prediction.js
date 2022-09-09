import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TeamPartition from '../components/PredictionCard/TeamPartition';
import TeamCombo from '../components/PredictionCard/TeamCombo';
import Teamcriteria from '../components/PredictionCard/Teamcriteria';
import { getcombo, filterCombo, filterPartition, filterCaptainRole, filterViceCaptainRole, preparePassData } from '../utils';
import CaptainPreference from '../components/PredictionCard/CaptainPreference';
import ViceCaptainPreference from '../components/PredictionCard/ViceCaptainPreference';

import Banner from '../components/Banner/Banner';


export default function Prediction() {
  const location = useLocation();

  const navigate = useNavigate();
  const { matchid, user_id, team1, team1img, team2, team2img } = location.state;

  const [showteamPreference, setShowteamPreference] = useState([]);
  const [teamPrediction, setTeamPrediction] = useState([]);
  const [teamcombo, setTeamcombo] = useState([]);
  const [selectedteamcombo, setSelectedTeamcombo] = useState(0);



  const onHandleClick = (event, name, value) => {
    let filteredArray = teamPrediction.filter(function (item) {
      return item[name] == value
    });
    if (filteredArray.length > 0) {
      let filteredArray1 = teamPrediction.filter(function (item) {
        return item[name] != value
      });
      setSelectedTeamcombo(filteredArray1.length)
      setTeamPrediction(filteredArray1);
    } else {
      setSelectedTeamcombo(preVstate => preVstate + 1);
      setTeamPrediction([...teamPrediction, { [name]: value }]);
    }

  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let combo = filterCombo(teamPrediction);
    let part = filterPartition(teamPrediction);
    let captainRole = filterCaptainRole(teamPrediction);
    let viceCaptainRole = filterViceCaptainRole(teamPrediction);
    let processData = preparePassData(0, teamPrediction, combo, part, captainRole, viceCaptainRole, matchid, team1, team2, e);
    console.log('processData', processData);

    return false;
    navigate('/dreamteam', { state: { matchid: matchid, user_id: user_id, team1: team1, team2: team2, team1img: team1img, team2img: team2img } });
  }

  console.log('teamPrediction', teamPrediction)

  return (
    
    <form onSubmit={formSubmitHandler}>
      {/* <Banner /> */}
      <div className="p-2">
        <div className='container'>
          <CaptainPreference team1={team1} team2={team2} onHandleClick={onHandleClick} />
          <ViceCaptainPreference team1={team1} team2={team2} onHandleClick={onHandleClick} />
          <TeamCombo onHandleClick={onHandleClick} />
          <TeamPartition team1={team1} team2={team2} onHandleClick={onHandleClick} />
          <Teamcriteria />
          <div className="bg-dark p-2 d-flex justify-content-center mb-1">
            <Link to={-1} className="btn btn-danger text-dark mr-1">
              Back
            </Link>
            <button type="submit" className="btn btn-success text-dark">Next</button>
          </div>
        </div>
      </div>
    </form>
  )
}
