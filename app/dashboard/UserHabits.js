"use client"
import React, {useState, useEffect} from 'react'
import { useAccount } from 'wagmi'
import { readContract } from "wagmi/actions";
import abi from "../../abi.json"
import HabitCard from './HabitCard';

const UserHabits = () => {

    const [habits, setHabits] = useState([])
    const { address, isConnected } = useAccount()

        useEffect(() => {
    async function fetchHabits() {
    try {
      const userHabits = await readContract({
        address: '0x7738c04168bf65206336a9474ce0b9c2ef2a144d',
        abi,
        functionName: 'getUserHabits',
        args: [address]
      })
      setHabits(userHabits);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  }

  fetchHabits();
}, [address, isConnected]); 

const uncompletedHabits = habits.filter(habit => !habit.completed);


  return (
<div className="my-10 mx-auto w-4/5 flex flex-wrap justify-center">
    {uncompletedHabits.map((habit, i) => (
        <div key={i} className="m-4">
            <HabitCard habit={habit}/>
        </div>
    ))}
</div>

  )
}

export default UserHabits