import React from 'react'
import Banner from '../components/Banner/Banner'
import MatchCard from '../components/MatchCard/MatchCard';
import PageTitle from '../components/PageTitle/PageTitle'

export default function Match() {


  return (
    <div>
      <PageTitle pagetitle={'Match'} />
      <Banner bgclass={'bg-overlay-match'}/>
      <div className='container'>
        <MatchCard/>
      </div>
    </div>
  )
}
