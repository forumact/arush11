import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import TeamSelectField from '../components/SelectField/TeamSelectField'

import { getPlayers } from '../features/players/playersSlice';
import Loader from "../components/Loader";
import PlayerPreview from "../components/PlayerPreview/PlayerPreview";
import ground from "../team-bg.jpg";


export default function Players() {

  const ra11player = useSelector((store) => store.player);
  const dispatch = useDispatch();

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };



  const onInputChangeHandler = (e) => {
    const { value } = e.target;
    dispatch(getPlayers(value))
  }

  useEffect(() => {
    document.title = 'Arush11 | Players'
    dispatch(getPlayers('ind'))
  }, [dispatch])

  const renderCard = (team) => ra11player.player.map(teambyrole => (
    <PlayerPreview teambyrole={teambyrole} bgimgStyle={bgimgStyle} team={team} />
  ));


  return (
    <div className='container-fluid mt-2'>
      <div className="row mt-2 bg-dark align-items-baseline">
        <div class="col-sm-2">
          <div class="form-group row p-1">
            <div class="col-sm-10">
              <TeamSelectField dname="Team" mname={'team'} id={'team'} value={"ind"} onChange={onInputChangeHandler} />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-conten-center align-items-center">
        <div className="col mt-3 mb-3">
          {ra11player.loading ? <Loader /> : renderCard('IND')}
        </div>
      </div>
    </div>
  )
}
