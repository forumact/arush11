import React from 'react'

export default function TeamCombo({ onHandleClick }) {
  return (
    <div className="card">
      <h5 className="card-header bg-info text-center text-white">Team Combination Strategy</h5>
      <div className="card-body bg-gray">
        <p className="card-title d-flex justify-content-between">
          <div className=''>
            <span className='ra11-bg-dark p-1 text-dark'>Available Combination</span>
            <span className='bg-danger p-2 fw-600 text-white badge badge-danger'>3</span>
          </div>
          <div className=''>
            <span className='ra11-bg-primary p-1'>Selected combination</span>
            <span className='bg-dark p-2 fw-600 text-white badge'>{'6'}</span>
          </div>
        </p>
        <div className='d-flex flex-wrap justify-content-center text-dark text-center mt-4'>
          <div class="card mr-3 mb-3 rounded" onClick={(e) => onHandleClick(e, 'combo', '1_3_1_6')}>
            <div class="card-body combo-card-body bowl rounded" label="radio_0">
              <div class="card-text">WK : 1</div>
              <div class="card-text">BAT : 3</div>
              <div class="card-text">ALL : 1</div>
              <div class="card-text">BOWL : 6</div>
            </div>
          </div>
          <div class="card mr-3 mb-3 rounded" onClick={(e) => onHandleClick(e, 'combo', '1_3_4_3')}>
            <div class="card-body combo-card-body bowl rounded" label="radio_0">
              <div class="card-text">WK : 1</div>
              <div class="card-text">BAT : 3</div>
              <div class="card-text">ALL : 4</div>
              <div class="card-text">BOWL : 3</div>
            </div>
          </div>
          <div class="card mr-3 mb-3 rounded" onClick={(e) => onHandleClick(e, 'combo', '1_3_3_4')}>
            <div class="card-body combo-card-body bowl rounded" label="radio_0">
              <div class="card-text">WK : 1</div>
              <div class="card-text">BAT : 3</div>
              <div class="card-text">ALL : 3</div>
              <div class="card-text">BOWL : 4</div>
            </div>
          </div>
          <div class="card mr-3 mb-3 rounded" onClick={(e) => onHandleClick(e, 'combo', '2_3_3_3')}>
            <div class="card-body combo-card-body bowl rounded" label="radio_0">
              <div class="card-text">WK : 2</div>
              <div class="card-text">BAT : 3</div>
              <div class="card-text">ALL : 3</div>
              <div class="card-text">BOWL : 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
