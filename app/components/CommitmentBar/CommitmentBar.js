"use client"
import React from 'react'
import './CommitmentBar.css'
import CommitmentModal from './CommitmentModal';
import { useAccount } from 'wagmi';

const CommitmentBar = () => {

  const {isConnected} = useAccount();

  return (

    <div className="bottom-shadow">
      <div className="flex justify-between items-center mx-auto w-4/5 py-4 ">
        <div className="text-xl font-bold">Your Habits</div>
        {isConnected && <CommitmentModal/>}
      </div>
      
    </div>

  );
}

export default CommitmentBar