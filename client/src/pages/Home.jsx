import React from 'react'
import Navbar from '../component/Navbar'
import LandPage from '../component/LandPage'
import JobSuggestions from '../component/FeaturesSection'
import HowItWorksSection from '../component/HowItWorksSection'
import Footer from '../component/Footer'
import CommonNavbar from '../component/CommonNavbar'
import Chatbot from '../component/Chatbot'

const Home = () => {

  return (
    <div className='h-[100vh]'>
      <CommonNavbar />
      <LandPage />
      <JobSuggestions />
      <HowItWorksSection />
      {/* <Chatbot /> */}
      <Footer />
    </div>
  )
}

export default Home
