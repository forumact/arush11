import React from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/Banner/Banner';
import PageTitle from '../components/PageTitle/PageTitle';
import { useNavigate } from 'react-router-dom';


import { pointsUpdate, getDreamTeamCount, updatePoints } from '../services/DreamTeamAPI';
import { getTeamPrecentage } from '../utils'

export default function Points() {

  const navigate = useNavigate();
  function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
  }

  let query = useQuery();
  let matchid = query.get('matchid');
  let team1 = query.get('team1');
  let team2 = query.get('team2');


  const [players, setPlayers] = React.useState([]);
  const [loader, setShowLoader] = React.useState(true);
  const [teamCount, setTeamCount] = React.useState();
  const [points, setPoints] = React.useState({});


  React.useEffect(() => {
    document.title = 'Points | RA11';
    pointsUpdate(matchid).then((response) => {
      setPlayers(response);
      setShowLoader(false)
    });

    getDreamTeamCount(matchid).then((response) => {
      setTeamCount(response);
    });

  }, [matchid]);


  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log('in', points);
    updatePoints(matchid, points);
    navigate(`/result?matchid=${matchid}&team1=${team1}&team2=${team2}`);
  }

  const onInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    setPoints({ ...points, [name]: value });
  };

  return (
    <>
      <Banner bgclass='bg-overlay-points'/>
      <PageTitle pagetitle="Points" />
      <form onSubmit={formSubmitHandler}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body bg-primary text-white">
                  <h5 className="card-title text-uppercase mb-0">Points Update</h5>
                </div>
                <div className="table-responsive">
                  <table className="table no-wrap user-table mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Role</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Team</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">#</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">%</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, index) => (
                        <tr key={index}>
                          <td className="pl-4">{index + 1}</td>
                          <td><h5 className="font-medium mb-0">{player._id}</h5></td>
                          <td><span className="text-muted">{player.fields[0].role}</span></td>
                          <td><span className="text-muted text-uppercase">{player.fields[0].team}</span></td>
                          <td><span className="text-muted">{player.count}</span></td>
                          <td><span className="text-muted">{getTeamPrecentage(player.count, teamCount)}%</span></td>
                          <td>
                            <input type="number" name={player._id} className="form-control" onChange={(e) => onInputChange(e)} 
                            defaultValue={player.fields[0].points ? player.fields[0].points : ''}/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-dark p-2 d-flex justify-content-center mb-1">
                  <button type="submit" className="btn btn-success text-dark">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
