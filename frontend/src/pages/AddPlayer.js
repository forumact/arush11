import React from 'react';
import { useNavigate } from 'react-router-dom';

import PlayerNumberForm from '../components/AddPlayerCard/PlayerNumberForm';
import SquadPullForm from '../components/AddPlayerCard/SquadPullForm';
import PageTitle from '../components/PageTitle/PageTitle'
import TeamSelectField from '../components/SelectField/TeamSelectField'

import { addPlayer } from '../services/PlayerAPI';

export default function AddPlayer() {

  const navigate = useNavigate();

  const [numberofTeam, setnumberofTeam] = React.useState([...Array(20)]);
  const [showPlayerNumberForm, setshowPlayerNumberForm] = React.useState(true);
  const [showSquadPullAddForm, setshowSquadPullAddForm] = React.useState(false);
  const [showPlayerAddForm, setPlayerAddForm] = React.useState(false);
  const [selectedFields, setselectedFields] = React.useState({
    team: "",
    status: ""
  });

  const PlayerNumberFormHandler = (event) => {
    event.preventDefault();
    let tempPlayer = {}
    Object.entries(event.target.elements).forEach(([name, input]) => {
      if (input.type !== 'submit' || (typeof input.type !== 'undefined')) {
        let value = (input.type === 'checkbox') ? (input.checked ? 'active' : 'inactive') : input.value;
        if (value.length > 0) {
          tempPlayer[input.name] = value;
        }
      }
    });

    console.log(tempPlayer)

    if (tempPlayer.number && tempPlayer.team !== 'Team') {
      setPlayerAddForm(true);
      setshowPlayerNumberForm(false);
      setshowSquadPullAddForm(true)
      setnumberofTeam(tempPlayer.number);
      setselectedFields({
        team: tempPlayer.team,
        status: tempPlayer.status
      });
    } else {
      alert('Please select team!')
    }

  }

  const PlayerAddFormHandler = async (event) => {
    event.preventDefault();
    let tempPlayer = {}
    Object.entries(event.target.elements).forEach(([name, input]) => {
      if (input.type !== 'submit' || (typeof input.type !== 'undefined')) {
        let value = (input.type === 'checkbox') ? (input.checked ? 'active' : 'inactive') : input.value;
        if (value.length > 0) {
          tempPlayer[input.name] = value;
        }
      }
    });
    let response = await addPlayer(tempPlayer, numberofTeam);
    if (response) {
      navigate(`/admin/players`);
    }
  }

  return (
    <>
      <PageTitle pagetitle={'Add Player'} />
      {showPlayerNumberForm && <PlayerNumberForm onAddMore={PlayerNumberFormHandler} />}
      {showSquadPullAddForm && <SquadPullForm />}
      {showPlayerAddForm && <div className='container mt-2'>
        <form onSubmit={PlayerAddFormHandler}>
          <div className="card">
            <h5 className="card-header text-center bg-info text-white">Player</h5>
            <div className="card-body bg-gray p-2">
              {
                [...Array(Number(numberofTeam))].map((players, index) => (
                  <div className="container p-2" key={index}>
                    <div className='row align-items-baseline'>
                      <div className='col-sm-1'><span className='badge bg-dark'>{index + 1}</span></div>
                      <div className="col">
                        <TeamSelectField dname="Team" mname={'team_' + index} id={'team_' + index} value={selectedFields.team} />
                      </div>
                      <div className="col-auto">
                        <input type="text" className="form-control player-name" name={'name_' + index} id={'playername_' + index} placeholder="Name" defaultValue={""} />
                      </div>
                      <div className="col-auto">
                        <select className="form-select roleselect" name={'role_' + index} id={'roleselect_' + index} defaultValue={""}>
                          <option svalue="ROLE" >ROLE</option>
                          <option value="WK">WK</option>
                          <option value="BAT">BAT</option>
                          <option value="AR">AR</option>
                          <option value="BOWL">BOWL</option>
                        </select>
                      </div>
                      <div className="col-auto">
                        <input type="text" className="form-control" name={"picture_" + index} id={'picture_' + index} placeholder="Picture" defaultValue={""} />
                      </div>
                      <div className="col">
                        <input type="number" step=".5" className="form-control" id={'credits_' + index} name={"credits_" + index} placeholder="credits" defaultValue={"8"} />
                      </div>
                      <div className="col">
                        <input className="form-check-input" type="checkbox" id={'status_' + index} name={"status_" + index} defaultValue={"active"}
                          defaultChecked={selectedFields.status === 'active' ? true : false} />
                        <label className="form-check-label" htmlFor="status">
                          Playing 11
                        </label>
                      </div>
                      <div className="col">
                        <input className="form-check-input" type="checkbox" id={"star_" + index} name={"star_" + index} defaultValue={""}
                          defaultChecked={"" === 'active' ? true : false} />
                        <label className="form-check-label" htmlFor="star">
                          Star
                        </label>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className='d-flex justify-content-center bg-dark p-2'><button type='submit' className='btn btn-primary'>Save</button></div>
            </div>
          </div>
        </form>
      </div>}
    </>
  )
}
