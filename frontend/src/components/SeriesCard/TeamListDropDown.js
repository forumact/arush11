import React from "react";

export default function TeamListDropDown(props) {
  return props.team.map((team) => (
    <option value={team.teamname} key={team._id}>
      {team.teamname}
    </option>
  ));
}
