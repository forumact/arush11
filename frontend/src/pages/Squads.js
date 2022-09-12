import React, { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ground from "../team-bg.jpg";
import { getSquad, selectAllPlayers, updatePlayer } from '../features/squad/squadSlice';
import Loader from "../components/Loader";
import PlayerPreview from "../components/PlayerPreview/PlayerPreview";
import { getMatchlocalStorage } from "../utils";

import Modal from '../components/Modal/Modal';
import TeamSelectField from "../components/SelectField/TeamSelectField";


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


  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);


  const allPlayers = useSelector(selectAllPlayers);

  // const { matchid, user_id, team1, team1img, team2, team2img } = location.state;

  const { matchid, user_id, team1, team1img, team2, team2img } = getMatchlocalStorage();

  let team1players = _.values(_.get(allPlayers, ['teamrole1']));
  let team2players = _.values(_.get(allPlayers, ['teamrole2']));

  useEffect(() => {
    document.title = 'Arush11 | Squad'
    dispatch(getSquad({ matchid, user_id, team1, team1img, team2, team2img }));
  }, [dispatch, matchid])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // navigate('/playing-11', {
    //   state: {
    //     matchid: matchid,
    //     user_id: user_id, team1: team1, team2: team2,
    //     team1img: team1img, team2img: team2img
    //   }
    // });

    navigate('/playing-11');
  }

  const modalSubmit = (event) => {
    event.preventDefault();
    let tempPlayer = {}
    Object.entries(event.target.elements).forEach(([name, input]) => {
      if (input.type != 'submit' || (typeof input.type !== undefined)) {
        let value = (input.type === 'checkbox') ? (input.checked ? 'active' : 'inactive') : input.value;
        if (value.length > 0) {
          tempPlayer[input.name] = value;
        }
      }
    });
    dispatch(updatePlayer(tempPlayer));
    Toggle()
  }

  const renderCard = (team, img) => team1players.map((teambyrole, index) => (
    <PlayerPreview teambyrole={teambyrole} team={team} img={img} bgimgStyle={bgimgStyle}
      toggle={Toggle} setmodalData={setmodalData} key={index} />
  ));


  const renderCard2 = (team, img) => team2players.map((teambyrole, index) => (
    <PlayerPreview teambyrole={teambyrole} team={team} img={img} bgimgStyle={bgimgStyle}
      toggle={Toggle} setmodalData={setmodalData} key={index} />
  ));


  const renderModalContent = (modalData, matchid, team1, team2) => {

    let teamrole = modalData.team == team1 ? 'teamrole1': 'teamrole2';
    return (
      <form onSubmit={modalSubmit}>
        <div className="card">
          <h5 className="card-header text-center bg-info text-white">Player Edit</h5>
          <div className="card-body bg-gray p-2">
            <div className='row'>
              <div className="col">
                <TeamSelectField dname="Team" mname={'team'} id={'team'} value={modalData.team} />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" name='name' placeholder="Name" defaultValue={modalData.name} />
              </div>
              <div className="col-auto">
                <select className="form-select roleselect" name='role' id='roleselect' defaultValue={modalData.role}>
                  <option svalue="ROLE" >ROLE</option>
                  <option value="WK">WK</option>
                  <option value="BAT">BAT</option>
                  <option value="AR">AR</option>
                  <option value="BOWL">BOWL</option>
                </select>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" name="picture" placeholder="Picture" defaultValue={modalData.picture} />
              </div>
              <div className="col">
                <input type="number" step=".5" className="form-control" name="credits" placeholder="credits" defaultValue={modalData.credits} />
              </div>
              <div className="col">
                <input className="form-check-input" type="checkbox" id="status" name="status" defaultValue={modalData.status}
                  defaultChecked={modalData.status === 'active' ? true : false} />
                <label className="form-check-label" htmlFor="status">
                  Playing 11
                </label>
              </div>
              <div className="col">
                <input className="form-check-input" type="checkbox" id="star" name="star" defaultValue={modalData.star}
                  defaultChecked={modalData.star === 'active' ? true : false} />
                <label className="form-check-label" htmlFor="star">
                  Star
                </label>
              </div>
              <input type='hidden' defaultValue={modalData.pid} name='pid' />
              <input type='hidden' defaultValue={matchid} name='matchid' />
              <input type='hidden' defaultValue={team1} name='team1' />
              <input type='hidden' defaultValue={team2} name='team2' />
              <input type='hidden' defaultValue={modalData.role} name='current_role' />
              <input type='hidden' defaultValue={teamrole} name='teamrole' />
              <div className="col">
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mt-3 mb-3">
          {ra11Squad.loading ? <Loader minh='650px' /> : renderCard(team1, team1img)}
        </div>
        <div className="col-md-6 mt-3 mb-3">
          {ra11Squad.loading ? <Loader minh='650px' /> : renderCard2(team2, team2img)}
        </div>
        <div className="bg-dark p-2 d-flex justify-content-center mb-1">
          <Link to={-1} className="btn btn-danger text-dark mr-1">
            Back
          </Link>
          <button className="btn btn-success text-dark" onClick={formSubmitHandler}>Next</button>
        </div>
      </div>
      <Modal show={modal1} title="Match Details" close={Toggle} submit={modalSubmit}>
        {modalData ? renderModalContent(modalData, matchid, team1, team2) : 'NotFound'}
      </Modal>
    </div>
  );
}
