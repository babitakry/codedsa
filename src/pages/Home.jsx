import React from 'react'
import Navbar from '../components/ui/Navbar'
import Hero from '../components/ui/Hero'
import Feature from '../components/ui/Feature'
import Footer from '../components/ui/Footer'

const Home = () => {
  return (
    <div className="pt-10 sm:pt-0">
      <Hero />
      <Feature />
    </div>

  )
}

export default Home