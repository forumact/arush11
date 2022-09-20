
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Banner from '../components/Banner/Banner';
import { deleteTeam, getTeam, addTeam, editTeam } from '../features/team/teamSlice';
import { rawDate, getUniqueId } from "../utils";
import Modal from '../components/Modal/Modal';
import PageTitle from "../components/PageTitle/PageTitle";
import TournamentSelectField from "../components/SelectField/TournamentSelectField";

import bgMatch from '../assets/team-bg.jpg';

export default function Team() {


  const ra11Team = useSelector(store => store.team);
  const dispatch = useDispatch();
  const tmid = getUniqueId(10);

  const bgimgStyle = {
    backgroundImage: 'linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.1)), url(' + bgMatch + ')',
    backgroundRepeat: "round",
    backgroundSize: "contain",
    opacity: 0.95,
  };

  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);

  useEffect(() => {
    dispatch(getTeam())
  }, [dispatch])


  const modalSubmit = (event) => {
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
    if (tempPlayer.op === 'create') {
      dispatch(addTeam(tempPlayer));
    } else {
      dispatch(editTeam(tempPlayer))
    }
    Toggle()
  }


  const renderCard = () => ra11Team?.team?.map(team => (
    <div className="col-md-3" key={team.tmid}>
      <div className="card mb-4 box-shadow">
        <div className="card-header" style={bgimgStyle}>
          <h5 className="text-white">{team.tournament_name ? team.tournament_name.replaceAll("_", " ").toUpperCase() : ""}</h5>
          <div className="row mt-4 mb-4">
            <div className="col-md-6">
              <div className="col">
                <img src={team.image} alt={team.teamname} width="30" className="mr-1"/>
                <span className="h6 text-white text-uppercase bolder badge bg-primary">{team !== '' ? team.teamname : ''}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col">
                <h6 className="text-white">{rawDate(team.createdAt)}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <div className="d-flex justify-content-between">
            <div className="btn-group">
              <Link className="btn btn btn-sm btn-outline-primary" to={`/admin/players?team=${team.teamname}`}>View</Link>
              <button className="btn btn btn-sm btn-outline-success" onClick={() => { Toggle(); setmodalData(team) }}>
                Edit
              </button>
              <button className="btn btn btn-sm btn-outline-danger" onClick={() => handleRemoveUser(team.tmid, team.teamname)}>
                Delete
              </button>
            </div>
            <small className={team.status === 'active' ? 'btn btn-sm text-uppercase text-white bg-success' : 'btn btn-sm text-uppercase text-white bg-danger'}>{team.status}</small>
          </div>
        </div>
      </div>
    </div>
  ));

  const handleRemoveUser = (tmid, teamname) => {
    let text = `Are you sure you want to delete this?`;
    var answer = window.confirm(text);
    if (answer) {
      dispatch(deleteTeam({ tmid, teamname }));
    }
  }

  const renderModalContent = (modalData) => {
    return (
      <form onSubmit={modalSubmit}>
        <div className="card m-0 shadow-none">
          <div className="card-body">
            <div className='row align-items-baseline'>
              <div className="col-auto">
                <TournamentSelectField dname="Tournament" mname="tournament_name" value={modalData.tournament_name} />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" name='teamname' placeholder="Tean Name" defaultValue={modalData.teamname} />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" name='image' placeholder="Image Url" defaultValue={modalData.image} />
              </div>
              <div className="col">
                <input className="form-check-input" type="checkbox" id="status" name="status" defaultValue={modalData.status}
                  defaultChecked={modalData.status === 'active' ? true : false} />
                <label className="form-check-label" htmlFor="status">
                  Status
                </label>
              </div>
              <input type='hidden' value={modalData.tmid ? modalData.tmid : tmid} name="tmid" />
              <input type='hidden' value={modalData.tmid ? 'update' : 'create'} name="op" />
              <div className="col">
                <button type="submit" className="btn btn-primary">{modalData ? 'Update' : 'Save'}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  return (
    <>
      <PageTitle pagetitle={'Teams'} />
      <Banner />
      <div className="container">
        <div className="row">
          {ra11Team.loading ? <Loader minh='550px' /> : renderCard()}
          <div className="fixed-action-btn align-items-end" onClick={() => { Toggle(); setmodalData(false) }}>
            <a className="btn btn-floating text-white bg-primary" href="#!">
              <i className="fas fa-plus"></i>
            </a>
          </div>
        </div>
      </div>
      <Modal show={modal1} title="Match Details" close={Toggle} submit={modalSubmit}>
        {renderModalContent(modalData ? modalData : '')}
      </Modal>
    </>
  )
}
