import React from 'react'

export default function DreamTeamFooter({ team }) {

  const playerRoleCount = function (teambyrole, role) {
    return teambyrole[role].length;
  }

  return (
    <div className={`d-flex justify-content-center bg-dark p-1 bg-opacity-50 ${playerRoleCount(team, 'WK')}_${playerRoleCount(team, 'BAT')}_${playerRoleCount(team, 'AR')}_${playerRoleCount(team, 'BOWL')}`}>
      <div className='col'><span className="badge">WL -  {playerRoleCount(team, 'WK')}</span></div>
      <div className='col'><span className="badge">BAT - {playerRoleCount(team, 'BAT')}</span></div>
      <div className='col'><span className="badge">AR - {playerRoleCount(team, 'AR')}</span></div>
      <div className='col'><span className="badge">BOWL - {playerRoleCount(team, 'BOWL')}</span></div>
    </div>
  )
}
