import React, { useState, useEffect } from 'react';
import { fetchTournament } from '../../services/TournamentAPI';

export default function TournamentSelectField(props) {

  const tournamentlist = [];

  useEffect(() => {
    fetchTournament().then((response) => {
      setTournament(response)
    });
  }, []);

  const [tournament, setTournament] = useState(tournamentlist);

  return (
    <select className="form-select" name={props.mname} id="specificSizeSelect" onChange={props.onChange} ref={props.cref}>
      <option>{props.dname}</option>
      {tournament.map((request, index) => {
        return (
          <option selected={props.value === request.name ? 'selected' : ''} value={request.name} key={request.name}>{request.name.toUpperCase()}</option>
        )
      })}
    </select>

  )
}
