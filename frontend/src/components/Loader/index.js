import React from 'react'

export default function Loader() {
  return (
    <div className="text-center min-vh-50">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
