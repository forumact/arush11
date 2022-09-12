import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom';

import { getMatch, selectAllMatch, deleteMyMatch } from '../../features/match/matchSlice';
import bgMatch from '../SeriesCard/team-bg.jpg'
import Modal from '../Modal/Modal';


export default function MatchCard() {

  const dispatch = useDispatch();

  const bgimgStyle = {
    backgroundImage: 'linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.1)), url(' + bgMatch + ')',
    backgroundRepeat: "round",
    backgroundSize: "contain",
    opacity: 0.95,
  };

  const ra11Match = useSelector(selectAllMatch);

  useEffect(() => {
    dispatch(getMatch());
  }, [dispatch])


  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);

  const handlerDelete = (matchid) => {
    let text = `Are you sure you want to delete?`;
    var answer = window.confirm(text);
    if (answer) {
      dispatch(deleteMyMatch({ matchid: matchid }));
    }
  }

  const renderModalContent = (modalData) => {
    return (
      <>
        <div className="card">
          <h5 className="card-header bg-info text-center text-white">Team Combination Strategy</h5>
          <div className="card-body bg-gray">
            <p className="card-title d-flex justify-content-between">
              <div className=''>
                <span className='ra11-bg-primary p-1'>Selected combination</span>
                <span className='bg-dark p-2 fw-600 text-white badge'>{'6'}</span>
              </div>
            </p>
            <div className='d-flex flex-wrap justify-content-center text-dark text-center mt-4'>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl rounded" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 1</div>
                  <div class="card-text">BOWL : 6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header bg-info text-center text-white">Team Partition Strategy</h5>
          <div className="card-body bg-gray">
            <p className="card-title d-flex justify-content-between">
              <div className=''>
                <span className='ra11-bg-primary p-1 text-dark'>Selected partition</span>
                <span className='bg-dark p-2 fw-600 text-white badge'>{'3'}</span>
              </div>
            </p>
            <div class="card-column-4 rounded text-dark text-center mt-4">
              <div className='card rounded' >
                <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
                  <div class="card-text">{'team1'} : 7</div>
                  <div class="card-text">{'team2'} : 4</div>
                </div>
              </div>
              <div className='card rounded' >
                <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
                  <div class="card-text">{'team1'} : 4</div>
                  <div class="card-text">{'team2'} : 7</div>
                </div>
              </div>
              <div className='card rounded' >
                <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
                  <div class="card-text">{'team1'} : 5</div>
                  <div class="card-text">{'team2'} : 6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header text-center bg-info text-white">Team Criteria Preference</h5>
          <div className="card-body bg-gray">
            <div className='row'>
              <div class="col">
                <input type="number" class="form-control" name='nt' placeholder="Num of Team" defaultValue="40" />
              </div>
              <div class="col">
                <input type="number" class="form-control" name='np' placeholder="Num of Process" defaultValue="100" />
              </div>
              <div class="col">
                <input type="number" class="form-control" name="ps" placeholder="Point Start" defaultValue="95" />
              </div>
              <div class="col">
                <input type="number" class="form-control" name="pe" placeholder="Point End" defaultValue="98" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderCard = () => ra11Match.map(match => (
    <div className="col-md-4" key={match.matchid}>
      <div className="card mb-4 box-shadow">
        <div className="card-header bg-card-ground" style={bgimgStyle}>
          <h3>{match.matchid}</h3>
          <div className="row mt-4 mb-4">
            <div className="col-md-6">
              <div className="col">
                <img width="30" height="30" src={match.team1img} />
                <span className="h6 badge badge-danger text-uppercase">{match.team1}</span>
              </div>
              <div className="col">
                <img width="30" height="30" src={match.team2img} />
                <span className="h6 badge badge-warning text-uppercase">{match.team2}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col">
                <h5 className="text-white">{match.createdAt.substring(0, 10)}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p>Please cross check your Team Points Here!</p>
          <div className='row'>
            <div className='col'>
              <Link to={`/result?matchid=${match.matchid}&team1=${match.team1}&team2=${match.team2}`}
                className='btn btn-sm btn-primary'>
                <i class="fa-solid fa-street-view"></i></Link>
            </div>
            <div className='col'>
              <Link to={`/points?matchid=${match.matchid}&team1=${match.team1}&team2=${match.team2}`} className='btn btn-sm btn-primary'><i class="fa-solid fa-edit"></i></Link>
            </div>
            <div className='col'>
              <button className='btn btn-sm btn-primary' onClick={() => { Toggle(); setmodalData(match) }}><i class="fa-solid fa-chart-simple"></i></button>
            </div>
            <div className='col'>
              <button className='btn btn-sm btn-primary'>{match.status}</button>
            </div>
            <div className='col'>
              <button className='btn btn-sm btn-danger' onClick={() => handlerDelete(match.matchid)}><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='row'>
      {renderCard()}
      <Modal show={modal1} title="Match Details" close={Toggle}>
        {modalData ? renderModalContent(modalData) : 'NotFound'}
      </Modal>
    </div>
  )
}
