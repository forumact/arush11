import React from "react";
import _ from 'lodash';

import Banner from "../components/Banner/Banner";
import SeriesCard from "../components/SeriesCard/SeriesCard";
import PageTitle from "../components/PageTitle/PageTitle";

export default function Series() {



  return (
    <div>
      <PageTitle pagetitle={'Series'} />
      <Banner bgclass={'bg-overlay-contest'}/>
      <section>
        <div className="container">
          <div className="row">
            <SeriesCard />
          </div>
        </div>
      </section>
    </div>
  );
}
