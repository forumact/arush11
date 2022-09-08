import React from 'react'
import Banner from '../components/Banner/Banner'

export default function PageNotFound() {
  return (
    <>
      <div class="container">
        <section class="px-md-5 mx-md-5 text-center dark-grey-text mb-4 p-5">
          <img src="https://mdbootstrap.com/img/Others/404_mdb.png" alt="Error 404" class="img-fluid mb-4" />
          <h3 class="font-weight-bold">Oops! This obviously isn't a page you were looking for.</h3>
          <p>Please, let us know how you got here, and use one of the following links to navigate back to safe harbor.</p>
        </section>
      </div>
    </>
  )
}
