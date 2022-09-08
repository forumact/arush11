import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeUserjson } from '../utils';

import { ra11login } from '../services/UserAPI';

import Banner from "../components/Banner/Banner";

export default function Login() {

  let userNameRef = useRef();
  let passwordRef = useRef();

  const navigate = useNavigate();

  const [showUserError, setUserShowError] = useState(false);
  const [showPassError, setPassShowError] = useState(false);
  useEffect(() => {
    document.title = 'Login | RA11';
  });

  const formSubmitHandler = (e) => {

    setPassShowError(false);
    setUserShowError(false);

    let success = true;

    let uname = userNameRef.current.value;
    let pass = passwordRef.current.value;
    e.preventDefault();
    if (!uname) {
      setUserShowError(true);
      success = false;
    }
    if (pass.length === 0) {
      setPassShowError(true);
      success = false;
    }

    if (success) {
      console.log('API CALL');
      ra11login(uname, pass).then((response) => {
        if (response.token) {
          storeUserjson(response.token);
          navigate('/series');
        }
      });

    }

  }

  return (
    <>
      {/* <Banner /> */}
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center h-100 p-5">
          <div className="col-md-4">
            <form onSubmit={formSubmitHandler}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input ref={userNameRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
