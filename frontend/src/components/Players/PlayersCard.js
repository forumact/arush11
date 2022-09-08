import React from "react";

import { splitName, getUniqueId } from '../../utils';

export default function PlayersCard({ player }) {
  let url = new URL(window.location.href);
  let clable = getUniqueId(6)
  let vclable = getUniqueId(7)
  return (
    <div className={`position-relative d-inline-block`}>
      <div className={`position-relative d-inline-block team-2 ${player.status}`}>
        <img
          src="data:image/png;base64,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"
          width="60"
          height="60"
          alt=""
        />
        <div className="pname fw-600 Tooltip-Wrapper fw-500">{splitName(player.name)}</div>
        <div className="bg-dark1 ra-credits alert-link">
          {player.star === 'active' && <span className="dreampick">
            <i className="fa-solid fa-shield-heart"></i>
          </span>}
          {(!url.pathname.match(/(captains)/) &&
            <span className="me-xxl-1 text-white">{player.credits}</span>
          )}
          {/* Show edit for admin and squad page alone */}
          {(url.pathname.match(/(admin|squad)/) &&
            <span className="text-white me-xxl-1 f15">
              <a className="text-white" href="/player/TBUvUaMG1e/NnWUQ6JzhJ/edit">
                <i className="fa-solid fa-pencil"></i>
              </a>
            </span>
          )}
          {/* Show delete for admin and squad page alone */}
          {(url.pathname.match(/(admin|squad)/) &&
            <span className="text-white delete" role="button">
              <i className="fas fa-trash"></i>
            </span>
          )}
        </div>
        {(url.pathname.match(/(captains)/) &&
          <>
            <div className="btn-group mt-1 shadow-none">
              <input type="checkbox" className="btn-check" id={clable} name={(player ? player.name : '')}
                 />
              <label className="btn btn-sm btn-outline-warning" htmlFor={clable}>Ca</label>
            </div>
            <div className="btn-group mt-1 ml-1 shadow-none" role="group">
              <input type="checkbox" className="btn-check" id={vclable} name={(player ? player.name : '')}
                 />
              <label className="btn btn-sm btn-outline-primary" htmlFor={vclable}>Vc</label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
