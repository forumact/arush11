import React from 'react'

export default function Loader(props) {
  return (
    <div className='loader-wrapper' style={{ 'minHeight': props.minh }}>
      <div className="text-center loader-vh" >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}
