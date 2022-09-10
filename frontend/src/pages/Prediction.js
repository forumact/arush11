import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import TeamPartition from '../components/PredictionCard/TeamPartition';
import PageTitle from '../components/PageTitle/PageTitle';
import TeamCombo from '../components/PredictionCard/TeamCombo';
import Teamcriteria from '../components/PredictionCard/Teamcriteria';
import {
  getcombo, filterCombo, filterPartition,
  filterCaptainRole,
  filterViceCaptainRole, preparePassData, getMatchlocalStorage
} from '../utils';
import CaptainPreference from '../components/PredictionCard/CaptainPreference';
import ViceCaptainPreference from '../components/PredictionCard/ViceCaptainPreference';

import Banner from '../components/Banner/Banner';
import { fetchPlayerForPrediction } from '../services/PlayerAPI';



export default function Prediction() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { matchid, user_id, team1, team1img, team2, team2img } = location.state;

  const { matchid, user_id, team1, team1img, team2, team2img } = getMatchlocalStorage();

  let combo = getcombo();
  let groupby = 'role';
  let selectedCombo = [];


  const [showteamPreference, setShowteamPreference] = useState([]);
  const [teamPrediction, setTeamPrediction] = useState([]);
  const [teamcombo, setTeamcombo] = useState([]);
  const [selectedteamcombo, setSelectedTeamcombo] = useState(0);
  const [selectedteampartition, setSelectedteampartition] = useState(0);



  useEffect(() => {
    document.title = 'Prediction | RA11';
    fetchPlayerForPrediction({ team1, team2, matchid, groupby }).then((response) => {
      for (var key in combo) {
        let rr = combo[key]["0"].split(",").map((item) => item.trim());
        let cwk = response[0].hasOwnProperty("WK") && response[0].WK.length >= rr[0];
        let cbat = response[0].hasOwnProperty("BAT") && response[0].BAT.length >= rr[1];
        let car = response[0].hasOwnProperty("AR") && response[0].AR.length >= rr[2];
        let cbowl = response[0].hasOwnProperty("BOWL") && response[0].BOWL.length >= rr[3];
        if (cwk && cbat && car && cbowl) {
          selectedCombo.push(rr);
        }
      }
      setTeamcombo(selectedCombo);
    });

  }, []);






  const onHandleClick = (event, name, value) => {
    let filteredArray = teamPrediction.filter(function (item) {
      return item[name] == value
    });
    if (filteredArray.length > 0) {
      let filteredArray1 = teamPrediction.filter(function (item) {
        return item[name] != value
      });
      if (name == 'combo') {
        setSelectedTeamcombo(filteredArray1.length);
      } if (name == 'partition') {
        setSelectedteampartition(filteredArray1.length);
      }
      setTeamPrediction(filteredArray1);
    } else {
      if (name == 'combo') {
        setSelectedTeamcombo(preVstate => preVstate + 1);
      } if (name == 'partition') {
        setSelectedteampartition(preVstate => preVstate + 1);
      }
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

    if (processData.combo.length == 0) {
      alert('Team Combination is not selected!');
      return false;
    }

    if (processData.partition.length == 0) {
      alert('Team Partition is not selected!');
      return false;
    }

    navigate('/dream-team', {
      state: {
        processData: processData
      }
    });
    alert('Team will be Created Soon');
  }

  return (

    <form onSubmit={formSubmitHandler}>
      {/* <Banner /> */}
      <PageTitle pagetitle="Prediction" />
      <div className="p-2">
        <div className='container'>
          <CaptainPreference team1={team1} team2={team2} onHandleClick={onHandleClick} />
          <ViceCaptainPreference team1={team1} team2={team2} onHandleClick={onHandleClick} />
          <TeamCombo combo={teamcombo} onHandleClick={onHandleClick} teamcomb={selectedteamcombo} />
          <TeamPartition team1={team1} team2={team2} onHandleClick={onHandleClick} teampartion={selectedteampartition} />
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
