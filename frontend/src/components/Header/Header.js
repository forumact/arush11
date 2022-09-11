import React from 'react';
import logo from './logo.jpg';
import _ from 'lodash';

import { MyRoutes } from "../../routes/myroutes";
import { Link } from 'react-router-dom';


export default function Header() {

  let protectedRoute = _.filter(MyRoutes, { 'protected': 'yes' });
  let adminRoute = _.filter(MyRoutes, { 'adminroute': 'yes' });
  let userRoute = _.filter(MyRoutes, { 'protected': 'no', 'adminroute': 'no' });

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to='/' className="navbar-brand">
          <img src={logo} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" />Arush11
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to='/match' className="navbar-link nav-item text-white">
              Match
            </Link>
          </li>
        </ul>
        <li className="nav nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#!" role="button" aria-haspopup="true" aria-expanded="false">Players</a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to='/admin/players'>Player List</Link>
            <Link className="dropdown-item" to='/admin/player/add'>Add Player</Link>
            <Link className="dropdown-item" to="/series">Series</Link>
            <Link className="dropdown-item" to="/admin/tournament">Tournament</Link>
            <Link className="dropdown-item" to="/admin/team">Team</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to='/match'>Match</Link>
          </div>
        </li>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </header>
  )
}
