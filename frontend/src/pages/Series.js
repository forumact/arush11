import React from "react";
import _ from 'lodash';

import Banner from "../components/Banner/Banner";
import MatchCard from "../components/MatchCard/MatchCard";

export default function Series() {



  return (
    <div>
      <Banner />
      <section>
        <div className="container">
          <div className="row">
            <MatchCard />
          </div>
        </div>
      </section>
    </div>
  );
}
