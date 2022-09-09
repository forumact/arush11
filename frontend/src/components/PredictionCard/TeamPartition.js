import React from 'react'

export default function TeamPartition({ team1, team2, onHandleClick }) {
  return (
    <div className="card">
      <h5 className="card-header bg-info text-center text-white">Team Partition Strategy</h5>
      <div className="card-body bg-gray">
        <p className="card-title d-flex justify-content-between">
          <div className=''>
            <span className='ra11-bg-dark p-1 text-dark'>Available Partition</span>
            <span className='bg-dark p-2 fw-600 text-white badge'>4</span>
          </div>
          <div className=''>
            <span className='ra11-bg-primary p-1 text-dark'>Selected partition</span>
            <span className='bg-dark p-2 fw-600 text-white badge'>{'3'}</span>
          </div>
        </p>
        <div class="card-column-4 rounded text-dark text-center mt-4">
          <div className='card rounded' onClick={(e) => onHandleClick(e, 'partition', '7_4')}>
            <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
              <div class="card-text">{team1} : 7</div>
              <div class="card-text">{team2} : 4</div>
            </div>
          </div>
          <div className='card rounded' onClick={(e) => onHandleClick(e, 'partition', '4_7')}>
            <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
              <div class="card-text">{team1} : 4</div>
              <div class="card-text">{team2} : 7</div>
            </div>
          </div>
          <div className='card rounded' onClick={(e) => onHandleClick(e, 'partition', '5_6')}>
            <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
              <div class="card-text">{team1} : 5</div>
              <div class="card-text">{team2} : 6</div>
            </div>
          </div>
          <div className='card rounded' onClick={(e) => onHandleClick(e, 'partition', '6_5')}>
            <div class="card-body combo-card-body partition-card text-uppercase rounded" label="radio_0">
              <div class="card-text">{team1} : 6</div>
              <div class="card-text">{team2} : 5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
