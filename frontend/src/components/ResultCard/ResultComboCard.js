import React from 'react'

export default function ResultComboCard({ combo }) {

  let res = combo ? Object.entries(combo) : [];

  return (
    <form className="form-inline d-flex col-md-3">
      <div className="form-row">
        <div className="form-group mr-2">
          <label htmlFor="exampleFormControlSelect1" className='mr-2 text-white'>Combo Filter</label>
          <select className="form-control form-select-lg" id="teamFilter">
            <option>All</option>
            {
              res.map((com, index) => (
                <option key={index} value={com}>{`${com.join(' | # ')}`}</option>
              ))
            }
          </select>
        </div>
      </div>
    </form>
  )
}
