import React from 'react'
import NavBar from '../components/NavBar'
import '../globals.css'
import CommitmentBar from '../components/CommitmentBar/CommitmentBar'
import UserHabits from './UserHabits'
import Footer from '../components/Footer'

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <div className="flex-grow">
        <CommitmentBar/>
        <UserHabits/>
      </div>
      <Footer/>
    </div>
  )
}


export default Dashboard