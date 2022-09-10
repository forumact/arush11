import React from 'react'

export default function DreamTeamFooter({ team }) {

  const playerRoleCount = function (teambyrole, role) {
    console.log(teambyrole[role].length)
    return teambyrole[role].length;
  }

  return (
    <div className="d-flex justify-content-center bg-trans bg-success p-1 bg-opacity-25">
      <div className='col'><span class="badge">WL -  {playerRoleCount(team, 'WK')}</span></div>
      <div className='col'><span class="badge">BAT - {playerRoleCount(team, 'BAT')}</span></div>
      <div className='col'><span class="badge">AR - {playerRoleCount(team, 'AR')}</span></div>
      <div className='col'><span class="badge">BOWL - {playerRoleCount(team, 'BOWL')}</span></div>
    </div>
  )
}
