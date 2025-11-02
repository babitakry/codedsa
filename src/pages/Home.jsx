import React, { useEffect, useState } from 'react'
import Hero from '../components/ui/Hero'
import Feature from '../components/ui/Feature'
import Loading from '@/components/auth/Loading'


const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    // ⏳ show spinner before the page content loads
    return <Loading />
  }

  return (
    <div className="pt-10 sm:pt-0">
      <Hero />
      <Feature />
    </div>

  )
}

export default Home