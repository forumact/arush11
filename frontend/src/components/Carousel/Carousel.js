import React from 'react';
import c1 from './c1.png';
import c2 from './c2.png';

export default function Carousel({id}) {
  return (
    <div id={`carouselExampleIndicators-${id}`} className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target={`#carouselExampleIndicators-${id}`} data-slide-to="0" className="active"></li>
        <li data-target={`#carouselExampleIndicators-${id}`} data-slide-to="1"></li>
        <li data-target={`#carouselExampleIndicators-${id}`} data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={c1} alt="First slide"  width='450' height='350'/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={c2} alt="Second slide" width='450' height='350'/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={c1} alt="Third slide" width='450' height='350'/>
        </div>
      </div>
      <a className="carousel-control-prev text-danger" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next text-danger" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}
