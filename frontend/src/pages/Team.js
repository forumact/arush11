
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Banner from '../components/Banner/Banner';
import { deleteTeam, getTeam } from '../features/team/teamSlice';
import { rawDate } from "../utils";
import PageTitle from "../components/PageTitle/PageTitle";


export default function Team() {


  const ra11Team = useSelector(store => store.team);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeam())
  }, [dispatch])



  const renderCard = () => ra11Team?.team?.map(team => (
    <tr key={team.tmid}>
      <th scope="row">{team.tmid}</th>
      <td>{team.tournament_name ? team.tournament_name.replaceAll("_", " ").toUpperCase() : ""}</td>
      <td className="text-uppercase bolder">{team !== '' ? team.teamname : ''}</td>
      <td><i className={'text-danger fa-heart ' + (team.status === 'active' ? 'fas' : 'far')}></i></td>
      <td>{rawDate(team.createdAt)}</td>
      <td>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={() => handleRemoveUser(team.tmid, team.teamname)}>
          <i className="fa fa-trash text-danger"></i>
        </button>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" data-toggle="modal" data-target="#UserModal">
          <i className="fa fa-edit"></i>
        </button>
      </td>
    </tr>
  ));

  const handleRemoveUser = (tmid, teamname) => {
    dispatch(deleteTeam({ tmid, teamname }));
  }

  const updateForm = (tid) => {
    navigate(`/admin/tournament/${tid}/edit`);
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
                <h5 className="card-title text-uppercase mb-0">Team - <span className="badge bg-dark">{ra11Team.team?.length }</span></h5>
                <span className='bg-dark btn text-white'>Create</span>
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
    </>
  )
}
