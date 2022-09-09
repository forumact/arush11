import React from 'react'

export default function ViceCaptainPreference({ team1, team2, onHandleClick }) {
  return (
    <div className="card">
      <h5 className="card-header text-center bg-info text-white">Vice Captain Preference</h5>
      <div className="card-body shadow-sm bg-gray">
        <div className='row'>
          <div className="col">
            <h5 className="card-title">Vice Captain </h5>
            <p className="card-text">Select the team Vice Captain for your Dream Team</p>
            <div className="btn-group shadow-none" role="group">
              <input type="radio" name="vcpt" className="btn-check" id="btncheck11" value={team1} />
              <label className="btn btn-outline-primary btn" htmlFor="btncheck11">{team1}</label>
              <input type="radio" name="vcpt" className="btn-check" id="btncheck21" value="both" />
              <label className="btn btn-outline-primary btn" htmlFor="btncheck21">Both</label>
              <input type="radio" name="vcpt" className="btn-check" id="btncheck31" value={team2} />
              <label className="btn btn-outline-primary btn" htmlFor="btncheck31">{team2}</label>
            </div>
          </div>
          <div className="col">
            <h5 className="card-title">Vice Captain Role</h5>
            <p className="card-text">Select the captain role for your Dream Team.</p>
            <div className="btn-group shadow-none" role="group">
              <input type="checkbox" name="vcrole" className="btn-check" id="btncheck41" value={'WK'} onClick={(e) => onHandleClick(e, 'vcrole', 'WK')} />
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck41">{'WK'}</label>
              <input type="checkbox" name="vcrole" className="btn-check" id="btncheck51" value="BAT" onClick={(e) => onHandleClick(e, 'vcrole', 'BAT')} />
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck51">BAT</label>
              <input type="checkbox" name="vcrole" className="btn-check" id="btncheck61" value={'AR'} onClick={(e) => onHandleClick(e, 'vcrole', 'AR')} />
              <label className="btn btn-outline-success btn mr-1" htmlFor="btncheck61">{'AR'}</label>
              <input type="checkbox" name="vcrole" className="btn-check" id="btncheck71" value={'BOWL'} onClick={(e) => onHandleClick(e, 'vcrole', 'BOWL')} />
              <label className="btn btn-outline-success btn" htmlFor="btncheck71">{'BOWL'}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
