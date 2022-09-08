import React from 'react';
import { Link } from 'react-router-dom';
import { getUserjson } from '../../utils';


export default function Banner() {

  let token = getUserjson();

  return (
    <section className="jumbotron text-center bg-dark text-white bg-overlay rounded-0">
      <div className="container">
        <h1>3 simple steps to create Dream Team</h1>
        <p className="lead">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so
          folks don't simply skip over it entirely.
        </p>

        {!token &&
          (<p>
            <Link to={'/login'} className="btn btn-danger mr-1">Login</Link>
            <Link to={'/register'} className="btn btn-primary">Register</Link>
          </p>)
        }
      </div>
    </section>
  )
}
