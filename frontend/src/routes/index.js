import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import _ from 'lodash';


import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { MyRoutes } from "./myroutes";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Ra11Routes() {

  let protectedRoute = _.filter(MyRoutes, { 'protected': 'yes' });
  let adminRoute = _.filter(MyRoutes, { 'adminroute': 'yes' });
  let userRoute = _.filter(MyRoutes, { 'protected': 'no', 'adminroute': 'no' });


  return (
    <Suspense>
      <BrowserRouter>
        <Header />
        <main className="bg-light">
          <Routes>
            {
              userRoute.map((myroute, index) => {
                return (
                  <Route key={index} title={myroute.title} path={myroute.path} element={<myroute.component />} />
                )
              })
            }
            <Route element={<ProtectedRoutes />}>
              {
                protectedRoute.map((myroute, index) => {
                  return (
                    <Route key={index} title={myroute.title} path={myroute.path} element={<myroute.component />} />
                  )
                })
              }
            </Route>
            <Route element={<ProtectedRoutes />}>
              {
                adminRoute.map((myroute, index) => {
                  return (
                    <Route key={index} title={myroute.title} path={myroute.path} element={<myroute.component />} />
                  )
                })
              }
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}