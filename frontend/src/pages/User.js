import React from 'react'
import Banner from '../components/Banner/Banner'

export default function User() {
  return (
    <>
      <Banner />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body bg-primary text-white">
                <h5 className="card-title text-uppercase mb-0">Manage Users</h5>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Occupation</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Added</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Category</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(10)].map((index) => (
                      <tr>
                        <td className="pl-4">{index + 1}</td>
                        <td><h5 className="font-medium mb-0">Daniel Kristeen</h5></td>
                        <td><span className="text-muted">Visual Designer</span></td>
                        <td><span className="text-muted">daniel@website.com</span></td>
                        <td><span className="text-muted">15 Mar 1988</span></td>
                        <td><span className="text-muted">User</span></td>
                        <td>
                          <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2">
                            <i className="fa fa-trash text-danger"></i>
                          </button>
                          <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" data-toggle="modal" data-target="#UserModal">
                            <i className="fa fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
