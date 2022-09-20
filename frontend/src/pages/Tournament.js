
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Banner from '../components/Banner/Banner';
import { getTournament, deleteTournament, addTournament, editTournament } from '../features/tournament/tournamentSlice';
import { rawDate, getUniqueId } from "../utils";

import Modal from '../components/Modal/Modal';
import PageTitle from '../components/PageTitle/PageTitle';

import bgMatch from '../assets/team-bg.jpg';


export default function Tournament() {


  const ra11Tournament = useSelector(store => store.tournament);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tid = getUniqueId(10);


  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);

  const bgimgStyle = {
    backgroundImage: 'linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.1)), url(' + bgMatch + ')',
    backgroundRepeat: "round",
    backgroundSize: "contain",
    opacity: 0.95,
  };

  useEffect(() => {
    dispatch(getTournament())
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
    console.log(tempPlayer)
    if (tempPlayer.op == 'create') {
      dispatch(addTournament(tempPlayer));
    } else {
      dispatch(editTournament(tempPlayer))
    }
    Toggle()
  }



  const renderCard = () => ra11Tournament.tournament.map(tournament => (
    <div class="col-md-3">
      <div class="card mb-4 box-shadow">
        <div class="card-header" style={bgimgStyle}>
          <h6 className="text-white text-uppercase">{tournament !== '' ? tournament.name : ''}</h6>
          <div class="row mt-4 mb-4">
            <div class="col-md-8">
              <div class="col">
                <h5 class="text-white">{rawDate(tournament.createdAt)}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="btn-group">
              <button class="btn btn btn-sm btn-outline-success" onClick={() => { Toggle(); setmodalData(tournament) }}>
                Edit
              </button>
              <button class="btn btn btn-sm btn-outline-danger" onClick={() => handleRemoveUser(tournament.tid)}>
                Delete
              </button>
            </div>
            <small className={tournament.status === 'active' ? 'btn btn-sm text-uppercase text-white bg-success' : 'btn btn-sm text-uppercase text-white bg-danger'}>{tournament.status}</small>
          </div>
        </div>
      </div>
    </div>
    // <tr key={tournament.tid}>
    //   <th scope="row">{tournament.tid}</th>
    //   <td className="text-uppercase bolder">{tournament !== '' ? tournament.name : ''}</td>
    //   <td>{rawDate(tournament.createdAt)}</td>
    //   <td><i className={'fa-heart ' + (tournament.status === 'active' ? 'fas' : 'far')}></i></td>
    //   <td>
    //     <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => handleRemoveUser(tournament.tid)}>
    //       <i className="fa fa-trash text-danger"></i>
    //     </button>
    //     <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => { Toggle(); setmodalData(tournament) }}>
    //       <i className="fa fa-edit"></i>
    //     </button>
    //   </td>
    // </tr>
  ));

  const handleRemoveUser = (tid) => {
    let text = `Are you sure you want to delete this?`;
    var answer = window.confirm(text);
    if (answer) {
      dispatch(deleteTournament({ tid }));
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
                <input type="text" className="form-control" name='name' placeholder="Tournament Name" defaultValue={modalData.name} />
              </div>
              <div className="col">
                <input className="form-check-input" type="checkbox" id="status" name="status" defaultValue={modalData.status}
                  defaultChecked={modalData.status === 'active' ? true : false} />
                <label className="form-check-label" htmlFor="status">
                  Status
                </label>
              </div>
              <input type='hidden' value={modalData.tid ? modalData.tid : tid} name="tid" />
              <input type='hidden' value={modalData.tid ? 'update' : 'create'} name="op" />
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
      <Banner />
      <PageTitle pagetitle="Tournament" />
      <div className="container">
        <div className="row">
          {ra11Tournament.loading ? <Loader minh='550px' /> : renderCard()}
          <div class="fixed-action-btn align-items-end" onClick={() => { Toggle(); setmodalData(false) }}>
            <a class="btn btn-floating text-white bg-primary" href="#!">
              <i class="fas fa-plus"></i>
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
