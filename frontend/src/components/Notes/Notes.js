import React from 'react';
import './Notes.css';

export default function Notes() {
  return (
    <div className="col-md-4 single-note-item all-category note-important">
      <div className="card card-body">
        <span className="side-stick"></span>
        <h5 className="note-title text-truncate w-75 mb-0">Go for lunch <i className="fa-solid fa-circle text-danger"></i></h5>
        <p className="note-date font-12 text-muted">01 April 2002</p>
        <div className="note-content">
          <p className="note-inner-content text-muted" data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.</p>
        </div>
      </div>
    </div>
  )
}
