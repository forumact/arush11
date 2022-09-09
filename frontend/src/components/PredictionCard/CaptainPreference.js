import React from 'react'

export default function CaptainPreference({ team1, team2, onHandleClick }) {
  return (
    <div className="card">
      <h5 className="card-header text-center bg-info text-white">Captain Preference</h5>
      <div className="card-body shadow-sm bg-gray">
        <div className='row'>
          <div className="col">
            <h5 className="card-title">Captain Team</h5>
            <p className="card-text">Select the team Captain for your Dream Team</p>
            <div className="btn-group shadow-none" role="group">
              <input type="radio" name="cpt" className="btn-check" id="btncheck1" value={team1} />
              <label className="btn btn-outline-primary btn" htmlFor="btncheck1">{team1}</label>
              <input type="radio" name="cpt" className="btn-check" id="btncheck2" value="both" />
              <label className="btn btn-outline-primary btn" htmlFor="btncheck2">Both</label>
              <input type="radio" name="cpt" className="btn-check" id="btncheck3" value={team2} />
              <label className="btn btn-outline-primary btn" htmlFor="btncheck3">{team2}</label>
            </div>
          </div>
          <div className="col">
            <h5 className="card-title">Captain Role</h5>
            <p className="card-text">Select the captain role for your Dream Team.</p>
            <div className="btn-group shadow-none" role="group">
              <input type="checkbox" name="crole" className="btn-check" id="btncheck4" value={'WK'} onClick={(e) => onHandleClick(e, 'crole', 'WK')} />
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck4">{'WK'}</label>
              <input type="checkbox" name="crole" className="btn-check" id="btncheck5" value="BAT" onClick={(e) => onHandleClick(e, 'crole', 'BAT')} />
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck5">BAT</label>
              <input type="checkbox" name="crole" className="btn-check" id="btncheck6" value={'AR'} onClick={(e) => onHandleClick(e, 'crole', 'AR')} />
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck6">{'AR'}</label>
              <input type="checkbox" name="crole" className="btn-check" id="btncheck7" value={'BOWL'} onClick={(e) => onHandleClick(e, 'crole', 'BOWL')} />
              <label className="btn btn-outline-success btn" htmlFor="btncheck7">{'BOWL'}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
