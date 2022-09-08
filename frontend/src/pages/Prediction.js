import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ground from "../team-bg.jpg";



export default function Prediction() {
  const location = useLocation();

  const navigate = useNavigate();
  const { matchid, user_id, team1, team1img, team2, team2img } = location.state;

  const bgimgStyle = {
    backgroundImage: "url(" + ground + ")",
    backgroundRepeat: "round",
    backgroundSize: "contain",
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    navigate('/dreamteam', { state: { matchid: matchid, user_id: user_id, team1: team1, team2: team2, team1img: team1img, team2img: team2img } });
  }

  return (
    <div className="p-2">
      <div className='container'>
        <div className="card">
          <h5 className="card-header text-center">Captain Preference</h5>
          <div className="card-body">
            <div className='row'>
              <div className="col">
                <h5 className="card-title">Captain </h5>
                <p className="card-text">Select the team Captain for your Dream Team</p>
                <div className="btn-group" role="group">
                  <input type="radio" name="wp" className="btn-check" id="btncheck1" value={team1} />
                  <label className="btn btn-outline-primary btn" htmlFor="btncheck1">{team1}</label>
                  <input type="radio" name="wp" className="btn-check" id="btncheck2" value="both" />
                  <label className="btn btn-outline-primary btn" htmlFor="btncheck2">Both</label>
                  <input type="radio" name="wp" className="btn-check" id="btncheck3" value={team2} />
                  <label className="btn btn-outline-primary btn" htmlFor="btncheck3">{team2}</label>
                </div>
              </div>
              <div className="col">
                <h5 className="card-title">Captain Role</h5>
                <p className="card-text">Select the captain role for your Dream Team.</p>
                <div className="btn-group" role="group">
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck4" value={'WK'} />
                  <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck4">{'WK'}</label>
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck5" value="BAT" />
                  <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck5">BAT</label>
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck6" value={'AR'} />
                  <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck6">{'AR'}</label>
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck6" value={'BOWL'} />
                  <label className="btn btn-outline-success btn" htmlFor="btncheck6">{'BOWL'}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header text-center">Vice Captain Preference</h5>
          <div className="card-body">
            <div className='row'>
              <div className="col">
                <h5 className="card-title">Vice Captain </h5>
                <p className="card-text">Select the team Vice Captain for your Dream Team</p>
                <div className="btn-group" role="group">
                  <input type="radio" name="wp" className="btn-check" id="btncheck1" value={team1} />
                  <label className="btn btn-outline-primary btn" htmlFor="btncheck1">{team1}</label>
                  <input type="radio" name="wp" className="btn-check" id="btncheck2" value="both" />
                  <label className="btn btn-outline-primary btn" htmlFor="btncheck2">Both</label>
                  <input type="radio" name="wp" className="btn-check" id="btncheck3" value={team2} />
                  <label className="btn btn-outline-primary btn" htmlFor="btncheck3">{team2}</label>
                </div>
              </div>
              <div className="col">
                <h5 className="card-title">Vice Captain Role</h5>
                <p className="card-text">Select the captain role for your Dream Team.</p>
                <div className="btn-group" role="group">
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck4" value={'WK'} />
                  <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck4">{'WK'}</label>
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck5" value="BAT" />
                  <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck5">BAT</label>
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck6" value={'AR'} />
                  <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck6">{'AR'}</label>
                  <input type="checkbox" name="cp" className="btn-check" id="btncheck6" value={'BOWL'} />
                  <label className="btn btn-outline-success btn" htmlFor="btncheck6">{'BOWL'}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header text-center">Team Combination Strategy</h5>
          <div className="card-body">
            <p className="card-title d-flex justify-content-between">
              <div className=''>
                <span className='ra11-bg-dark p-1'>Select any one combination from</span>
                <span className='bg-dark p-2 fw-600'>{'combo.length'}</span>
              </div>
              <div className=''>
                <span className='ra11-bg-primary p-1'>Selected combination</span>
                <span className='bg-dark p-2 fw-600'>{'selectedteamcombo'}</span>
              </div>
            </p>
            <div className='d-flex flex-wrap justify-content-center text-dark text-center'>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
              <div class="card mr-3 mb-3 rounded">
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                  <div class="card-text">ALL : 2</div>
                  <div class="card-text">BOWL : 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-dark text-white">
          <h5 className="card-header text-center">Team Partition Strategy</h5>
          <div className="card-body">
            <p className="card-title d-flex justify-content-between">
              <div className=''>
                <span className='ra11-bg-dark p-1'>Select any one Partition from</span>
                <span className='bg-dark p-2 fw-600'>{'combo.length'}</span>
              </div>
              <div className=''>
                <span className='ra11-bg-primary p-1'>Selected partition</span>
                <span className='bg-dark p-2 fw-600'>{'selectedteamcombo'}</span>
              </div>
            </p>
            <div class="card-column-4 mr-3 rounded text-dark text-center">
              <div className='card rounded'>
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                </div>
              </div>
              <div className='card rounded'>
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                </div>
              </div>
              <div className='card rounded'>
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                </div>
              </div>
              <div className='card rounded'>
                <div class="card-body combo-card-body bowl" label="radio_0">
                  <div class="card-text">WK : 1</div>
                  <div class="card-text">BAT : 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header text-center">Vice Captain Preference</h5>
          <div className="card-body">
            <div className='row'>
              <div class="col">
                <input type="number" class="form-control" placeholder="Num of Team" />
              </div>
              <div class="col">
                <input type="number" class="form-control" placeholder="Num of Process" />
              </div>
              <div class="col">
                <input type="number" class="form-control" placeholder="Point Start" />
              </div>
              <div class="col">
                <input type="number" class="form-control" placeholder="Point End" />
              </div>
              <div class="col">
                <input class="form-check-input" type="checkbox" id="gridCheck" />
                <label class="form-check-label" for="gridCheck">
                  Save
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark p-2 d-flex justify-content-center mb-1">
          <Link to={-1} className="btn btn-danger text-dark mr-1">
            Back
          </Link>
          <button className="btn btn-success text-dark" onClick={formSubmitHandler}>Next</button>
        </div>
      </div>
    </div>
  )
}
