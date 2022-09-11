import React from 'react'
import ReactDOM from "react-dom";
import "./Modal.css"

export default function Modal({ show, close, title, children }) {
  return ReactDOM.createPortal(
    <>
      {show && (
        <div className="modalContainer animated fadeInRigh" onClick={() => close()}>
          <div className="modal1" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
              <button type="button" className="close" name="close_circle" data-dismiss="modal" aria-label="Close" onClick={() => close()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal")
  );
}

