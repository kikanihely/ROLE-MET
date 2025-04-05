import React from 'react'
import Navbar from '../component/Navbar'
import LandPage from '../component/LandPage'
import JobSuggestions from '../component/FeaturesSection'
import CommunitySection from '../component/CommunitySection'
import Footer from '../component/Footer'
import CommonNavbar from '../component/CommonNavbar'
import Chatbot from '../component/Chatbot'

const Home = () => {

  return (
    <div className='h-[100vh]'>
      <CommonNavbar />
      <LandPage />
      <JobSuggestions />
      <CommunitySection />
      <Chatbot />
      <Footer />
    </div>
  )
}

export default Home
