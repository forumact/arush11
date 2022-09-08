import React from 'react'
import Banner from '../components/Banner/Banner'
import Carousel from '../components/Carousel/Carousel'
import Notes from '../components/Notes/Notes'

export default function Home() {
  return (
    <>
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
