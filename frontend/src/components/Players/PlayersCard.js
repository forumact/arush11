import React from "react";

import { splitName, getUniqueId } from '../../utils';

import playerImg from './t1.png';


export default function PlayersCard({ player, toggle, setmodalData, onDelete }) {
  let url = new URL(window.location.href);
  let clable = getUniqueId(6)
  let vclable = getUniqueId(7)
  return (
    <div className={`position-relative d-inline-block team-2 ${player.status}`}>
      <img src={playerImg} width="60" height="60" alt="" />
      <div className="pname fw-600 Tooltip-Wrapper fw-500" title={player.name}>{splitName(player.name)}</div>
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
            <span className="text-white cursor-pointer" onClick={() => { toggle(); setmodalData(player) }}>
              <i className="fa-solid fa-pencil"></i>
            </span>
          </span>
        )}
        {/* Show delete for admin and squad page alone */}
        {(url.pathname.match(/(admin|squad)/) &&
          <span className="text-white delete" role="button" onClick={() => onDelete(player)}>
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
          <div className="btn-group mt-1 ml-1" role="group">
            <input type="checkbox" className="btn-check" id={vclable} name={(player ? player.name : '')}
            />
            <label className="btn btn-sm btn-outline-primary" htmlFor={vclable}>Vc</label>
          </div>
        </>
      )}
    </div>
  );
}
