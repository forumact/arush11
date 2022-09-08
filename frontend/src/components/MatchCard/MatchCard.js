import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";

import { getSeries } from '../../features/series/seriesSlice';

import bgMatch from './team-bg.jpg';
import TeamListDropDown from './TeamListDropDown';

import { getUniqueId } from '../../utils'
import Loader from '../Loader';

export default function MatchCard({ series }) {

  const navigate = useNavigate();

  const [team1, setTeam1] = useState('');
  const [team1img, setTeam1img] = useState('');
  const [team2, setTeam2] = useState('');
  const [team2img, setTeam2img] = useState('');

  const randid = getUniqueId(10);
  const user_id = 15;

  const ra11Series = useSelector((store) => store.series);
  let seriesGroupBy = _.groupBy(ra11Series.series, "tournament_name");
  var ra11Seriesarr = _.values(seriesGroupBy);
  console.log('ra11Series', ra11Series.loading)

  const dispatch = useDispatch();

  const bgimgStyle = {
    backgroundImage: 'linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.1)), url(' + bgMatch + ')',
    backgroundRepeat: "round",
    backgroundSize: "contain",
    opacity: 0.95,
  };

  useEffect(() => {
    dispatch(getSeries());
  }, [])

  const inputHandler1 = (e) => {
    let value = e.target.value;
    setTeam1(value);
    let selectedTeam1 = _.filter(ra11Series.series, ['teamname', value]);
    setTeam1img(_.get(selectedTeam1, ['0', 'image']));
  }

  const inputHandler2 = (e) => {
    let value = e.target.value;
    setTeam2(value);
    let selectedTeam2 = _.filter(ra11Series.series, ['teamname', value]);
    setTeam2img(_.get(selectedTeam2, ['0', 'image']));
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    navigate('/squad', { state: { matchid: randid, user_id: user_id, team1: team1, team2: team2, team1img: team1img, team2img: team2img } });
  }

  const renderCard = () => ra11Seriesarr.map(series => (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <div className="card-header bg-card-ground" style={bgimgStyle}>
          <h3 className='text-capitalize'>{series[0].tournament_name.replaceAll('_', " ")}</h3>
          <div className="row mt-4 mb-4">
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
              <div className="col">
                <h5 className="text-white">11-12-2022</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={formSubmitHandler}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <select id="inputState" className="form-control text-uppercase" onChange={inputHandler1}>
                  <option defaultValue={''}>Team 1</option>
                  <TeamListDropDown team={series} />
                </select>
              </div>
              <div className="form-group col-md-6">
                <select id="inputState" className="form-control text-uppercase" onChange={inputHandler2}>
                  <option defaultValue={''}>Team 2</option>
                  <TeamListDropDown team={series} />
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-danger">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  ));

  return (
    ra11Series.loading ? <Loader /> : renderCard()
  )
}
