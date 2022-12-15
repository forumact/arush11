import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

import ground from "../team-bg.jpg";
import DreamTamPlayerPreview from '../components/DreamTeamCard/DreamTamPlayerPreview';
import PageTitle from '../components/PageTitle/PageTitle';
import { getResult } from '../features/result/resultSlice';
import Loader from '../components/Loader';
import ResultComboCard from '../components/ResultCard/ResultComboCard';



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

  const { result, combo } = ra11result.result;
  return (
    <>
      <PageTitle pagetitle={'Results'} />
      <div className='container-fluid mb-4'>
        <div className="row bg-dark p-2">
          <section className="d-flex justify-content-between">
            <div className='text-white'>
              Team: <span className='badge bg-white text-dark'>{result?.length}</span>
            </div>
            <ResultComboCard combo={combo} />
          </section>
        </div>
        <div className="row justify-content-center">
          {
            ra11result.loading ? <Loader minh='650px' /> : result?.map((players, index) => (
              <div className={`col-auto mt-4`} key={index}>
                <DreamTamPlayerPreview teambyrole={players} bgimgStyle={bgimgStyle} team1={team1} team2={team2} tnumber={index} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
