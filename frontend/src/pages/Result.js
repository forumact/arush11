import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FetchCreatedDreamTeam } from '../services/DreamTeamAPI';
import ground from "../team-bg.jpg";
import DreamTamPlayerPreview from '../components/DreamTeamCard/DreamTamPlayerPreview';
import PageTitle from '../components/PageTitle/PageTitle';


export default function Result() {

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  const [loader, setShowLoader] = useState(true);
  const [dreamTeam, setDreamTeam] = useState([...Array(20)]);

  function useQuery() {
    const { search } = useLocation();
    console.log(search)
    return new URLSearchParams(search);
  }

  let query = useQuery();

  let matchid = query.get('matchid');
  let team1 = query.get('team1');
  let team2 = query.get('team2');


  useEffect(() => {
    FetchCreatedDreamTeam(matchid).then((response) => {
      setShowLoader(false)
      console.log(response);
      setDreamTeam(response);

    });
  }, []);


console.log(team1, team2)

  let gridClass = loader === true ? 'col-md-4' : 'col-auto';

  return (
    <>
    <PageTitle pagetitle={'Results'} />
    <div className='container mb-4'>
      <div className="row justify-content-center">
        {
          dreamTeam.map((players, index) => (
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
