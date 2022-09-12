
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Banner from '../components/Banner/Banner';
import { deleteTeam, getTeam, addTeam, editTeam } from '../features/team/teamSlice';
import { rawDate, getUniqueId } from "../utils";
import Modal from '../components/Modal/Modal';
import PageTitle from "../components/PageTitle/PageTitle";
import TournamentSelectField from "../components/SelectField/TournamentSelectField";


export default function Team() {


  const ra11Team = useSelector(store => store.team);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tmid = getUniqueId(10);

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
    <tr key={team.tmid}>
      <th scope="row">{team.tmid}</th>
      <td>{team.tournament_name ? team.tournament_name.replaceAll("_", " ").toUpperCase() : ""}</td>
      <td className="text-uppercase bolder">
        <span className="mr-1 badge bg-dark">{team !== '' ? team.teamname : ''}</span>
        <span><img src={team.image} alt={team.teamname} width="30" /></span>
      </td>
      <td><i className={'text-danger fa-heart ' + (team.status === 'active' ? 'fas' : 'far')}></i></td>
      <td>{rawDate(team.createdAt)}</td>
      <td>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => handleRemoveUser(team.tmid, team.teamname)}>
          <i className="fa fa-trash text-danger"></i>
        </button>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => { Toggle(); setmodalData(team) }}>
          <i className="fa fa-edit"></i>
        </button>
      </td>
    </tr>
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
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body bg-primary text-white d-flex justify-content-between">
                <h5 className="card-title text-uppercase mb-0">Team - <span className="badge bg-dark">{ra11Team.team?.length}</span></h5>
                <span className='bg-dark btn text-white' onClick={() => { Toggle(); setmodalData(false) }}>Create</span>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Tournament</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Team</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Status</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Date</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ra11Team.loading ? <tr><td colSpan="6"><Loader /></td></tr> : renderCard()}
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
