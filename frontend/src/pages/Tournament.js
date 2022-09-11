
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Banner from '../components/Banner/Banner';
import { getTournament, deleteTournament, addTournament, editTournament } from '../features/tournament/tournamentSlice';
import { rawDate, getUniqueId } from "../utils";

import Modal from '../components/Modal/Modal';
import PageTitle from '../components/PageTitle/PageTitle';


export default function Tournament() {


  const ra11Tournament = useSelector(store => store.tournament);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tid = getUniqueId(10);


  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);


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
    <tr key={tournament.tid}>
      <th scope="row">{tournament.tid}</th>
      <td className="text-uppercase bolder">{tournament !== '' ? tournament.name : ''}</td>
      <td>{rawDate(tournament.createdAt)}</td>
      <td><i className={'fa-heart ' + (tournament.status === 'active' ? 'fas' : 'far')}></i></td>
      <td>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => handleRemoveUser(tournament.tid)}>
          <i className="fa fa-trash text-danger"></i>
        </button>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => { Toggle(); setmodalData(tournament) }}>
          <i className="fa fa-edit"></i>
        </button>
      </td>
    </tr>
  ));

  const handleRemoveUser = (tid) => {
    dispatch(deleteTournament({ tid }));
  }

  const updateForm = (tid) => {
    navigate(`/admin/tournament/${tid}/edit`);
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
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body bg-primary text-white d-flex justify-content-between">
                <h5 className="card-title text-uppercase mb-0">Tounrament - <span className="badge bg-dark">{ra11Tournament.tournament?.length}</span></h5>
                <span className='bg-dark btn text-white' onClick={() => { Toggle(); setmodalData(false) }}>Create</span>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Status</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Date</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ra11Tournament.loading ? <tr><td colSpan="6"><Loader /></td></tr> : renderCard()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modal1} title="Match Details" close={Toggle} submit={modalSubmit}>
        {renderModalContent(modalData ? modalData : '')}
      </Modal>
    </>
  )
}
