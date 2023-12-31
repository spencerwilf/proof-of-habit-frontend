"use client"
import React, {useState, useEffect} from 'react';
import { parseEther, formatEther } from 'viem';
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import abi from "../../abi.json"
import { useAccount } from 'wagmi';


const HabitCard = ({ habit }) => {

    const {address} = useAccount();

    const [loading, setLoading] = useState(false)
    const [txSuccess, setTxSuccess] = useState(false)

    let nextCheckIn = Number(habit.lastCheckIn) + 86400
    const nextDayDate = new Date(nextCheckIn * 1000);


  const formatAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 5);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

const options = {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};

  const checkIn = async() => {

    
        try {
            const tx = await writeContract({
            address: '0x7738c04168bf65206336a9474ce0b9c2ef2a144d',
            abi,
            functionName: 'userCheckIn',
            args: [habit.id],
            })

            setLoading(true)
            await waitForTransaction(tx)
            setTxSuccess(true)

        } catch(e) {
            console.log(e)
        }
        setLoading(false)
    }

    useEffect(() => {

    })

return (
<div className="card shadow-lg rounded-xl w-full max-w-md p-4 pb-10 bg-gradient-to-r from-blue-300 to-blue-500 text-white min-w-[300px] h-auto min-h-[400px]">
      <div className="card-body space-y-6 md:space-y-8">
        <div className='flex-grow'>
        <h2 className="card-title text-2xl font-bold mt-2 mb-4">{habit.title}</h2>

        <div className="space-y-4">  {/* Add this div with a space-y utility */}

          <div className="flex justify-between items-center">
            <span>Amount staked:</span>
            <span className="font-semibold">{formatEther(habit.amount.toString())} ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="mr-2">Loss Address:</span>
            <span className="font-semibold">{formatAddress(habit.lossAddress)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Duration:</span>
            <span className="font-semibold">{Number(habit.howManyDays)} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Checked in days:</span>
            <span className="font-semibold">{`${Number(habit.checkedInDays)} ${Number(habit.checkedInDays) == 1 ? 'day' : 'days'}`} </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="mr-4">Next check in: </span>
            <span className="font-semibold">
              { (Date.now() / 1000 >= nextCheckIn) ? 'Now!' : nextDayDate.toLocaleString('en-US', options) }
            </span>
          </div>

        </div>  {/* Close the div with a space-y utility */}

        </div>

        <div className="flex justify-center mt-4">
          {!loading ? ( <button 
            onClick={checkIn} 
            disabled={!(Date.now() / 1000 >= nextCheckIn)} 
            className={`transition duration-300 ease-in-out hover:bg-blue-400 w-full bg-blue-500 text-white font-bold py-3 px-3 rounded-full 
            ${!(Date.now() / 1000 >= nextCheckIn) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Check In
          </button>) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </div>
);

};

export default HabitCard;
