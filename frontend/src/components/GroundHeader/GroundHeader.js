import React from 'react';
import { credits, playerCount } from '../../utils';

export default function GroundHeader({ team, img, teambyrole, toggle, setmodalData }) {

  return (
    <div className="d-flex justify-content-between bg-trans bg-success p-1 text-dark bg-opacity-50">
      <div className="p-1">
        <span className="text-uppercase badge fs-6 badge-success">
          {team}
        </span> : <span className="text-uppercase badge fs-6 badge-dark">{playerCount(teambyrole)}</span>
      </div>
      <div className="p-1">
        {img && <div className="fs-6 badge badge-primary text-dark">
          Squads - <img src={img} alt={team} width="20" height="20" />
        </div>}
      </div>
      <div className="p-1">
        <div className="d-inline-block fs-6 badge">CR</div>
        <span className="text-white badge fs-6 bg-dark">{credits(teambyrole)}</span>
      </div>
    </div>
  )
}
