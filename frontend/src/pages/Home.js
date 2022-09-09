import React from 'react'
import Banner from '../components/Banner/Banner'
import Carousel from '../components/Carousel/Carousel'
import Notes from '../components/Notes/Notes'
import PageTitle from '../components/PageTitle/PageTitle'

export default function Home() {
  return (
    <>
      <PageTitle pagetitle={'Home'} />
      <Banner />
      <div className='d-flex'>
        {/* <Notes />
        <Notes />
        <Notes /> */}
      </div>
      <Carousel />
    </>
  )
}
