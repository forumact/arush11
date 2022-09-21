import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

import ground from "../team-bg.jpg";
import DreamTamPlayerPreview from '../components/DreamTeamCard/DreamTamPlayerPreview';
import PageTitle from '../components/PageTitle/PageTitle';
import { getResult } from '../features/result/resultSlice';
import Loader from '../components/Loader';



export default function Result() {

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  const ra11result = useSelector((store) => store.result);
  const dispatch = useDispatch();

  const [loader, setShowLoader] = useState(true);
  const [combos, setCombos] = useState([]);
  const [dreamTeam, setDreamTeam] = useState([...Array(20)]);

  function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
  }

  let query = useQuery();

  let matchid = query.get('matchid');
  let team1 = query.get('team1');
  let team2 = query.get('team2');

  useEffect(() => {
    dispatch(getResult(matchid))
  }, [dispatch, matchid])


  // useEffect(() => {
  //   FetchCreatedDreamTeam(matchid).then((response) => {
  //     setShowLoader(false)
  //     let combo = {};
  //     for (let inc = 0; inc < response.dreamTeam.data.data.length; inc++) {
  //       let num = response.dreamTeam.data.data[inc].combo.join('_');
  //       combo[num] = combo[num] ? combo[num] + 1 : 1;
  //     }
  //     setDreamTeam(response.result);
  //     setCombos(combo);
  //   });
  // }, [matchid]);

  // console.log(ra11result)
  let gridClass = loader === true ? 'col-md-4' : 'col-auto';

  return (
    <>
      <PageTitle pagetitle={'Results'} />
      <div className='container-fluid mb-4'>
        <div className="row bg-dark p-2">
          <section className="d-flex justify-content-between">
            <div className='text-white'>
              Team: <span className='badge bg-white text-dark'>{dreamTeam.length}</span>
            </div>
            <form className="form-inline d-flex col-md-3">
              <div className="form-row">
                <div className="form-group mr-2">
                  <label htmlFor="exampleFormControlSelect1" className='mr-2 text-white'>Combo Filter</label>
                  <select className="form-control form-select-lg" id="teamFilter">
                    <option>All</option>
                    {
                      Object.entries(combos).map((com, index) => (
                        <option key={index} value={com}>{`${com.join(' | # ')}`}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </form>
          </section>
        </div>
        <div className="row justify-content-center">
          {
            ra11result.loading ? <Loader minh='650px' /> : ra11result?.result?.map((players, index) => (
              <div className={`${gridClass} mt-4`} key={index}>
                <DreamTamPlayerPreview teambyrole={players} bgimgStyle={bgimgStyle} team1={team1} team2={team2} tnumber={index} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
