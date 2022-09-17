import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Banner from '../components/Banner/Banner'
import PageTitle from '../components/PageTitle/PageTitle'
import { rawDate, getUniqueId } from "../utils";

import { getUser } from '../features/user/userSlice';
import Loader from '../components/Loader';


export default function User() {

  const ra11User = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = getUniqueId(10);


  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);


  useEffect(() => {
    dispatch(getUser())
  }, [])



  const handleRemoveUser = (tmid, teamname) => {
    let text = `Are you sure you want to delete this?`;
    var answer = window.confirm(text);
    if (answer) {
      // dispatch(deleteTeam({ tmid, teamname }));
    }
  }

  console.log('ra11User', ra11User)


  const renderCard = () => ra11User?.user?.map(user => (
    <div className="col-md-3">
      <div class="card rounded">
        <div class="card-content rounded">
          <div class="card-body bg-dark rounded">
            <div class="media d-flex">
              <div class="media-body text-left">
                <h3 class="text-success text-uppercase">{user.name}</h3>
                <span className="text-white">{user.email}</span>
              </div>
              <div class="align-self-center">
                <i class="fa fa-user text-success font-large-2 float-right"></i>
              </div>
            </div>
          </div>
          <div className="card-footer rounded">
            <div class="d-flex justify-content-between">
              <div class="btn-group">
                <button class="btn btn btn-sm btn-outline-success" onClick={() => { Toggle(); setmodalData(user) }}>
                  Edit
                </button>
                <button class="btn btn btn-sm btn-outline-danger" onClick={() => handleRemoveUser(user.tmid, user.teamname)}>
                  Delete
                </button>
              </div>
              <small className={user.status == 'A' ? 'btn btn-sm text-uppercase text-white bg-success' : 'btn btn-sm text-uppercase text-white bg-danger'}>{user.status}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));




  return (
    <>
      <Banner />
      <PageTitle pagetitle={'User'} />
      <div className="container">
        <div className="row">
          {ra11User.loading ? <Loader minh='550px' /> : renderCard()}
        </div>
      </div>
    </>
  )
}
