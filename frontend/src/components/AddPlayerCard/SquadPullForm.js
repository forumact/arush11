import React from 'react'

export default function SquadPullForm() {
  return (
    <div className='container mt-2'>
        <div className="card">
          <h5 className="card-header text-center bg-info text-white">Squad Pull Form</h5>
          <div className="card-body bg-gray p-2">
            <div className="container p-2">
              <div className='row align-items-baseline'>
                <div className="col-sm-3">
                  <input type="text" className="form-control" name='number' placeholder="Squad Url" id="squadtext"/>
                </div>
                <div className="col-sm-2">
                  <input type="text" className="form-control" name='col_number' placeholder="Column Number" id="col-num"/>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary" id="pullsquad">Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
