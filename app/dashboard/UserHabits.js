"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import abi from "../../abi.json";
import HabitCard from "./HabitCard";
import { publicClient } from "../components/client";
import { parseAbiItem } from "viem";
import StyledConnectButton from "./StyledConnectButton";

const UserHabits = () => {
  const [habits, setHabits] = useState([]);
  const { address, isConnected } = useAccount();

  const { data, isError, refetch } = useContractRead({
    address: "0x7738c04168bf65206336a9474ce0b9c2ef2a144d",
    abi,
    functionName: "getUserHabits",
    args: [address],
    chainId: 11155111,
    enabled: !!address,
  });

  useEffect(() => {
    if (data) {
      setHabits(data);
    }

    const unwatch = publicClient.watchEvent({
      address: "0x7738c04168bf65206336a9474ce0b9c2ef2a144d",
      event: parseAbiItem(
        "event HabitCreated(uint256 indexed id, address indexed proposer, string title)"
      ),
      onLogs: () => {
        refetch();
      },
    });

    const unwatch2 = publicClient.watchEvent({
      address: "0x7738c04168bf65206336a9474ce0b9c2ef2a144d",
      event: parseAbiItem(
        "event CheckedIn(uint256 indexed id, address indexed proposer, uint256 indexed checkedInDays)"
      ),
      onLogs: () => {
        refetch();
      },
    });

    return () => {
      unwatch();
      unwatch2();
    };
  }, [data, refetch]);

  if (!isConnected) {
    return (
      <div className="col-span-full flex justify-center items-center">
        <div>
          <h2>Please connect your wallet</h2>
          <StyledConnectButton />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching habits.</div>;
  }

  const uncompletedHabits = habits.filter((habit) => !habit.completed);

  return (
    <div className="my-10 mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl flex justify-center">
      {uncompletedHabits.length ? (
        uncompletedHabits.map((habit, i) => (
          <div key={i} className="m-4">
            <HabitCard habit={habit} />
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center">
          <div>No habits yet!</div>
        </div>
      )}
    </div>
  );
};

export default UserHabits;
