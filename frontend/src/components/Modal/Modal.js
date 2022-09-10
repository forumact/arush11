import React from 'react'
import ReactDOM from "react-dom";
import "./Modal.css"

export default function Modal({ show, close, title, children}) {
  return ReactDOM.createPortal(
    <>
      {show && (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal1" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
              <button type="button" className="close" name="close_circle" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" name="close" data-dismiss="modal" onClick={() => close()}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal")
  );
}

