import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/UserAPI';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner/Banner'

export default function Register() {

  const navigate = useNavigate();

  const NameRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(NameRef.current.value);
    console.log(EmailRef.current.value);
    console.log(PasswordRef.current.value);

    let name = NameRef.current.value;
    let email = EmailRef.current.value;
    let password = PasswordRef.current.value;
    if (name && email && password) {
      let response = register(name, email, password).then(response => {
        navigate('/login')
      });
      console.log(response)
    } else {
      alert('Please fill all the fields to register')
    }

    console.log('register')

  }

  return (
    <div>
      {/* <Banner /> */}
      <div className="container">
        <div className="row justify-content-center align-items-center h-100 p-5">
          <div className="col-md-4 p-4">
            <form className="" onSubmit={formSubmitHandler}>
              {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
              <div className="row mb-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Name</label>
                  <input ref={NameRef} type="textfield" className="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="User Name" />
                </div>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input ref={EmailRef} type="email" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input ref={PasswordRef} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>

              {/* <!-- Checkbox --> */}
              <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" />
                <label className="form-check-label" htmlFor="form2Example33">
                  Subscribe to our newsletter
                </label>
              </div>

              {/* <!-- Submit button --> */}
              <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

              {/* <!-- Register buttons --> */}
              <div className="text-center">
                <p>or sign up with:</p>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
