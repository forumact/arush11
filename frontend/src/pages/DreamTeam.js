import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchPlayerForPrediction, fetchMyMatchCaptains } from '../services/PlayerAPI';
import { deleteDreamTeam, createDreamTeamSave } from '../services/DreamTeamAPI';
import PlayerPreview from '../components/PlayerPreview/PlayerPreview';
import ground from "../team-bg.jpg";
import DreamTamPlayerPreview from '../components/DreamTeamCard/DreamTamPlayerPreview';




export default function DreamTeam() {

  const location = useLocation();
  const { processData } = location.state;

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  let team1 = processData.team1;
  let team2 = processData.team2;
  let matchid = processData.matchid;
  let groupby = 'none'

  const [loader, setShowLoader] = useState(true);
  const [dreamTeam, setDreamTeam] = useState([...Array(20)]);


  useEffect(() => {
    document.title = 'Dream Team | RA11';
    async function createDreamTeam({ team1, team2, matchid, groupby }) {
      try {

        let players = await fetchPlayerForPrediction({ team1, team2, matchid, groupby });
        let captains = await fetchMyMatchCaptains(matchid, team1, team2);
        await deleteDreamTeam(matchid);
        let dreamTeam = await createDreamTeamSave(players, processData, captains);
        // return await Promise.all(dreamTeam);
        return dreamTeam;
      } catch (error) {
        console.log(error);
      }
    }

    createDreamTeam({ team1, team2, matchid, groupby }).then((response) => {
      setDreamTeam(response);
      setShowLoader(false)

    });

  }, []);

  let gridClass = loader === true ? 'col-md-4' : 'col-auto';

  return (
    <div className='container mb-4'>
      <div className="row justify-content-center">
        {
          dreamTeam.map((players, index) => (
            <div className={`${gridClass} mt-4`} key={index}>
              <DreamTamPlayerPreview teambyrole={players} bgimgStyle={bgimgStyle}  team1={team1} team2={team2} tnumber={index}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}
