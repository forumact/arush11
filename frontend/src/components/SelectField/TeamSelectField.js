import React, { useState, useEffect } from 'react';
import { fetchTeam } from '../../services/TeamAPI';

export default function TeamSelectField(props) {

  const teamlist = [];

  useEffect(() => {
    fetchTeam().then((response) => {
      setTeam(response)
    });
  }, []);

  const [team, setTeam] = useState(teamlist);

  return (
      <select className="form-select text-uppercase" defaultValue={props.value} name={props.mname}
        id={props.id}>
        <option>{props.dname}</option>
        {team.map((request, index) => {
          return (
            <option key={request.tmid} selected={props.value === request.teamname ? 'selected' : ''}
              value={request.teamname}>{request.teamname}</option>
          )
        })}
      </select>
  )
}
