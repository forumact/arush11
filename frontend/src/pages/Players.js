import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import TeamSelectField from '../components/SelectField/TeamSelectField'

import { getPlayers, updatePlayerAndGet } from '../features/players/playersSlice';
import Loader from "../components/Loader";
import PlayerPreview from "../components/PlayerPreview/PlayerPreview";
import ground from "../team-bg.jpg";
import PageTitile from '../components/PageTitle/PageTitle';

import Modal from '../components/Modal/Modal';


export default function Players() {

  const ra11player = useSelector((store) => store.player);
  const dispatch = useDispatch();

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  const [modal1, setModal] = React.useState(false);
  const [modalData, setmodalData] = React.useState(false);
  const Toggle = () => setModal(!modal1);

  const onInputChangeHandler = (e) => {
    const { value } = e.target;
    dispatch(getPlayers(value))
  }

  useEffect(() => {
    dispatch(getPlayers('ind'))
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
    dispatch(updatePlayerAndGet(tempPlayer));
    Toggle()
  }

  const renderCard = (team) => ra11player.player.map((teambyrole, index) => (
    <PlayerPreview teambyrole={teambyrole} bgimgStyle={bgimgStyle} team={team} toggle={Toggle} 
    setmodalData={setmodalData} key={index} />
  ));


  const renderModalContent = (modalData) => {
    console.log(modalData)
    return (
      <form onSubmit={modalSubmit}>
        <div className="card">
          <h5 className="card-header text-center bg-info text-white">{`Edit - ${modalData.name}`}</h5>
          <div className="card-body bg-gray p-2">
            <div className='row'>
              <div className="col">
                <TeamSelectField dname="Team" mname={'team'} id={'team'} value={modalData.team} />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" name='name' placeholder="Name" defaultValue={modalData.name} />
              </div>
              <div className="col-auto">
                <select className="form-select roleselect" name='role' id='roleselect' defaultValue={modalData.role}>
                  <option svalue="ROLE" >ROLE</option>
                  <option value="WK">WK</option>
                  <option value="BAT">BAT</option>
                  <option value="AR">AR</option>
                  <option value="BOWL">BOWL</option>
                </select>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" name="picture" placeholder="Picture" defaultValue={modalData.picture} />
              </div>
              <div className="col">
                <input type="number" step=".5" className="form-control" name="credits" placeholder="credits" defaultValue={modalData.credits} />
              </div>
              <div className="col">
                <input className="form-check-input" type="checkbox" id="status" name="status" defaultValue={modalData.status}
                  defaultChecked={modalData.status === 'active' ? true : false} />
                <label className="form-check-label" htmlFor="status">
                  Playing 11
                </label>
              </div>
              <div className="col">
                <input className="form-check-input" type="checkbox" id="star" name="star" defaultValue={modalData.star}
                  defaultChecked={modalData.star === 'active' ? true : false} />
                <label className="form-check-label" htmlFor="star">
                  Star
                </label>
              </div>
              <input type='hidden' defaultValue={modalData.pid} name='pid' />
              <div className="col">
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }


  return (
    <>
      <PageTitile pagetitle={"Player"} />
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
      <Modal show={modal1} title="Player Edit" close={Toggle} submit={modalSubmit}>
        {modalData ? renderModalContent(modalData) : 'NotFound'}
      </Modal>
    </>
  )
}
