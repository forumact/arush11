
import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
      if (input.type != 'submit' || (typeof input.type !== undefined)) {
        let value = (input.type === 'checkbox') ? (input.checked ? 'active' : 'inactive') : input.value;
        if (value.length > 0) {
          tempPlayer[input.name] = value;
        }
      }
    });
    // console.log(tempPlayer)
    // return false;
    if (tempPlayer.op == 'create') {
      dispatch(addTeam(tempPlayer));
    } else {
      dispatch(editTeam(tempPlayer))
    }
    Toggle()
  }


  const renderCard = () => ra11Team?.team?.map(team => (
    // <tr key={team.tmid}>
    //   <th scope="row">{team.tmid}</th>
    //   <td>{team.tournament_name ? team.tournament_name.replaceAll("_", " ").toUpperCase() : ""}</td>
    //   <td className="text-uppercase bolder">
    //     <span className="mr-1 badge bg-dark">{team !== '' ? team.teamname : ''}</span>
    //     <span><img src={team.image} alt={team.teamname} width="30" /></span>
    //   </td>
    //   <td><i className={'text-danger fa-heart ' + (team.status === 'active' ? 'fas' : 'far')}></i></td>
    //   <td>{rawDate(team.createdAt)}</td>
    //   <td>
    //     <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => handleRemoveUser(team.tmid, team.teamname)}>
    //       <i className="fa fa-trash text-danger"></i>
    //     </button>
    //     <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => { Toggle(); setmodalData(team) }}>
    //       <i className="fa fa-edit"></i>
    //     </button>
    //   </td>
    // </tr>
    <div class="col-md-4">
      <div class="card mb-4 box-shadow">
        <div class="card-header" style={bgimgStyle}>
          <h5 className="text-white">{team.tournament_name ? team.tournament_name.replaceAll("_", " ").toUpperCase() : ""}</h5>
          <div class="row mt-4 mb-4">
            <div class="col-md-6">
              <div class="col">
                <img src={team.image} alt={team.teamname} width="30" />
                <span class="h6 text-white text-uppercase bolder">{team !== '' ? team.teamname : ''}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="col">
                <h5 class="text-white">{rawDate(team.createdAt)}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <div class="d-flex justify-content-between">
            <div class="btn-group">
              <Link className="btn btn btn-sm btn-outline-primary" to={'/admin/players'}>View</Link>
              <button class="btn btn btn-sm btn-outline-success" onClick={() => { Toggle(); setmodalData(team) }}>
                Edit
              </button>
              <button class="btn btn btn-sm btn-outline-danger" onClick={() => handleRemoveUser(team.tmid, team.teamname)}>
                Delete
              </button>
            </div>
            <small className={team.status == 'active' ? 'btn btn-sm text-uppercase text-white bg-success' : 'btn btn-sm text-uppercase text-white bg-danger'}>{team.status}</small>
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
    console.log(modalData)
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
          <div class="fixed-action-btn align-items-end" onClick={() => { Toggle(); setmodalData(false) }}>
            <a class="btn btn-floating text-white bg-primary" href="#!">
              <i class="fas fa-pencil-alt"></i>
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
