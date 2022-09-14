import React from 'react'

export default function ViewCaptainPreference({ team1, team2, defaultTeam, captainChoice }) {
  console.log('defaultTeam', defaultTeam)
  return (
    <div className="card">
      <h5 className="card-header text-center bg-info text-white">Captain Preference</h5>
      <div className="card-body shadow-sm bg-gray">
        <div className='row'>
          <div className="col">
            <h5 className="card-title">Captain Team</h5>
            <p className="card-text">Select the team Captain for your Dream Team</p>
            <div className="btn-group shadow-none" role="group">
              <input type="radio" name="cpt" className="btn-check" id="btncheck1" value={team1} 
              checked={defaultTeam === team1 ? true : false} disabled/>
              <label className="btn btn-outline-primary btn" htmlFor="btncheck1">{team1}</label>
              <input type="radio" name="cpt" className="btn-check" id="btncheck2" value="both" 
              checked={defaultTeam === 'both' ? true : false} disabled/>
              <label className="btn btn-outline-primary btn" htmlFor="btncheck2">Both</label>
              <input type="radio" name="cpt" className="btn-check" id="btncheck3" value={team2} 
              checked={defaultTeam === team2 ? true : false} disabled/>
              <label className="btn btn-outline-primary btn" htmlFor="btncheck3">{team2}</label>
            </div>
          </div>
          <div className="col">
            <h5 className="card-title">Captain Role</h5>
            <p className="card-text">Select the captain role for your Dream Team.</p>
            <div className="btn-group shadow-none" role="group">
              <input type="checkbox" name="crole" className="btn-check" id="btncheck4" value={'WK'} 
              checked={captainChoice.includes("WK") ? true: false} disabled/>
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck4">{'WK'}</label>
              <input type="checkbox" name="crole" className="btn-check" id="btncheck5" value="BAT" 
              checked={captainChoice.includes("BAT") ? true: false} disabled/>
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck5">BAT</label>
              <input type="checkbox" name="crole" className="btn-check" id="btncheck6" value={'AR'} 
              checked={captainChoice.includes("AR") ? true: false} disabled/>
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck6">{'AR'}</label>
              <input type="checkbox" name="crole" className="btn-check" id="btncheck7" value={'BOWL'} 
              checked={captainChoice.includes("BOWL") ? true: false} disabled/>
              <label className="btn btn-outline-success btn" htmlFor="btncheck7">{'BOWL'}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
