import React from 'react'
import NavBar from '../components/NavBar'
import '../globals.css'
import CommitmentBar from '../components/CommitmentBar/CommitmentBar'
import UserHabits from './UserHabits'

const Dashboard = () => {
    
  return (
    <div>
    <NavBar/>
    <CommitmentBar/>
    <UserHabits/>
    </div>
  )
}

export default Dashboard