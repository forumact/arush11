import React from 'react'
import TeamSelectField from '../SelectField/TeamSelectField'

export default function PlayerNumberForm({onAddMore}) {
  return (
    <div className='container mt-2'>
      <form onSubmit={onAddMore}>
        <div className="card">
          <h5 className="card-header text-center bg-info text-white">Player Number</h5>
          <div className="card-body bg-gray p-2">
            <div className="container p-2">
              <div className='row align-items-baseline'>
                <div className="col-sm-2">
                  <input type="number" className="form-control" name='number' placeholder="Player Count" defaultValue="15" />
                </div>
                <div className="col-sm-2">
                  <TeamSelectField dname="Team" mname={'team'} id={'team'} value={""} />
                </div>
                <div className="col-sm-1">
                  <input className="form-check-input" type="checkbox" id="status" name="status" defaultValue={""}
                    defaultChecked={"" === 'active' ? true : false} />
                  <label className="form-check-label" htmlFor="status">
                    Playing 11
                  </label>
                </div>
                <div className="col-sm-1">
                  <input className="form-check-input" type="checkbox" id="star" name="star" defaultValue={""}
                    defaultChecked={"" === 'active' ? true : false} />
                  <label className="form-check-label" htmlFor="star">
                    Star
                  </label>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
