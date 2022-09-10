import React from 'react'

export default function TeamCombo({ combo, onHandleClick, teamcomb }) {
  console.log('selectedteamcombo', teamcomb)
  return (
    <div className="card">
      <h5 className="card-header bg-info text-center text-white">Team Combination Strategy</h5>
      <div className="card-body bg-gray">
        <p className="card-title d-flex justify-content-between">
          <div className=''>
            <span className='ra11-bg-dark p-1 text-dark'>Available Combination</span>
            <span className='bg-danger p-2 fw-600 text-white badge badge-danger'>{combo.length}</span>
          </div>
          <div className=''>
            <span className='ra11-bg-primary p-1'>Selected combination</span>
            <span className='bg-dark p-2 fw-600 text-white badge'>{teamcomb}</span>
          </div>
        </p>
        <div className='d-flex flex-wrap justify-content-center text-dark text-center mt-4'>
          {combo.map((com, index) => {
            let fname = 'combo';
            let fvalue = `${com['0']}_${com['1']}_${com['2']}_${com['3']}`;
            return (
              <div className="card me-3 mb-3 combo-card rounded" key={index} onClick={(e) => onHandleClick(e, fname, fvalue)}>
                <div className="card-body combo-card-body rounded fw-600" label="">
                  <div className="card-text">WK : {com['0']}</div>
                  <div className="card-text">BAT : {com['1']}</div>
                  <div className="card-text">ALL : {com['2']}</div>
                  <div className="card-text">BOWL : {com['3']}</div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}
