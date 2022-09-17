import React from 'react';
import { getRole } from '../../utils';

export default function RoleSelectField({ custclass, name, id, defaultValue }) {
  let role = getRole();
  return (
    <select className={custclass} name={name} id={id} defaultValue={defaultValue}>
      <option svalue="ROLE" >ROLE</option>
      {role?.map((role) => {
        return (
          <>
            <option value={role} key={role}>{role}</option>
          </>
        )
      })}

    </select>
  )
}
