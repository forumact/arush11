import React from 'react'

export default function Teamcriteria() {
  return (
    <div className="card">
            <h5 className="card-header text-center bg-info text-white">Team Criteria Preference</h5>
            <div className="card-body bg-gray">
              <div className='row'>
                <div class="col">
                  <input type="number" class="form-control" name='nt' placeholder="Num of Team" defaultValue="40" />
                </div>
                <div class="col">
                  <input type="number" class="form-control" name='np' placeholder="Num of Process" defaultValue="100" />
                </div>
                <div class="col">
                  <input type="number" class="form-control" name="ps" placeholder="Point Start" defaultValue="95" />
                </div>
                <div class="col">
                  <input type="number" class="form-control" name="pe" placeholder="Point End" defaultValue="98" />
                </div>
                <div class="col">
                  <input class="form-check-input" type="checkbox" id="gridCheck" name="save" defaultValue="save" />
                  <label class="form-check-label" for="gridCheck">
                    Save
                  </label>
                </div>
              </div>
            </div>
          </div>
  )
}
