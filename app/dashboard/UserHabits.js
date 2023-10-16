"use client"
import React, {useState, useEffect} from 'react'
import { useAccount } from 'wagmi'
import { readContract } from "wagmi/actions";
import abi from "../../abi.json"
import HabitCard from './HabitCard';
import { publicClient } from '../components/client';
import { parseAbiItem } from 'viem';
import StyledConnectButton from './StyledConnectButton';

const UserHabits = () => {

    const [habits, setHabits] = useState([])
    const [eventDetected, setEventDetected] = useState(false);
    const { address, isConnected } = useAccount()

    useEffect(() => {
        async function fetchHabits() {
            try {
                const userHabits = await readContract({
                    address: '0x7738c04168bf65206336a9474ce0b9c2ef2a144d',
                    abi,
                    functionName: 'getUserHabits',
                    args: [address]
                });
                setHabits(userHabits);
            } catch (error) {
                console.error('Error fetching habits:', error);
            }
        }

        // Call fetchHabits initially to load the habits on component mount
        fetchHabits();

        // Set up the event watcher
        const unwatch = publicClient.watchEvent({
            address: '0x7738c04168bf65206336a9474ce0b9c2ef2a144d',
            event: parseAbiItem('event HabitCreated(uint256 indexed id, address indexed proposer, string title)'),
            onLogs: logs => {
                console.log(logs);
                // Call fetchHabits again whenever an event is detected
                fetchHabits();
            }
        });

        // Clean up the event listener when the component is unmounted
        return () => {
            unwatch();
        };

    }, [address, isConnected]);


const uncompletedHabits = habits.filter(habit => !habit.completed);


  return (

<div className="my-10 mx-auto w-4/5 flex flex-wrap justify-center">

    {isConnected ? (uncompletedHabits.length ? (
        uncompletedHabits.map((habit, i) => (
            <div key={i} className="m-4">
                <HabitCard habit={habit}/>
            </div>
        ))
    ) : (
        <div>No habits yet</div>
    )) : (
        <div>
        <h2>Please connect your wallet</h2>
        <StyledConnectButton/>
        </div>
    )}
</div>


  )
}

export default UserHabits