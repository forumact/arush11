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
      <nav className="navbar navbar-expand-lg navbar-white bg-white text-dark">
        <div className="col d-flex align-items-center">
          <Link to='/' className="navbar-brand text-dark">
            <img src={logo} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" />Arush11
          </Link>
          <ul className="nav">
            <li className="nav-item">
              <Link to='/match' className="navbar-link nav-item text-dark">
                Match
              </Link>
            </li>
          </ul>
          <li className="nav nav-item dropdown">
            <a className="nav-link dropdown-toggle text-dark" data-toggle="dropdown" href="#!" role="button" aria-haspopup="true"
              aria-expanded="false">Admin</a>
            <div className="dropdown-menu">
              {adminRoute.map((route, index) => (
                // console.log(route)
                <Link key={index} className="dropdown-item" to={route.path}>{route.title}</Link>
              ))}
            </div>
          </li>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div>
        <button className="btn btn-danger float-right">
          Logout
        </button>

        </div>
        
      </nav>
    </header>
  )
}
