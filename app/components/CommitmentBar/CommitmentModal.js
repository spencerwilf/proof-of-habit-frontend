"use client"
import React, {useEffect, useState} from 'react'
import abi from "../../../abi.json"
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { parseEther, isAddress } from 'viem';
import { eventEmitter } from './events';


const CommitmentModal = () => {


    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [lossAddress, setLossAddress] = useState(
      "0x000000000000000000000000000000000000dEaD"
    );
    const [value, setValue] = useState("")
    const [step, setStep] = useState(1)
    
    const [loading, setLoading] = useState(false)
    const [txSuccess, setTxSuccess] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const [habitCreated, setHabitCreated] = useState(false);

        const isNumber = (input) => {
        const regex = /^\d+$/;
        return regex.test(input);
    }

        const handleStep = () => {
          
        setHasSubmitted(true)
        if (step === 1 && errors.name) {
          return alert("Please submit a valid title")
        }

        if (step === 2 && errors.duration) {
          return alert("Please submit a duration 3 days or over")
        }

        if (step === 3 && errors.lossAddress) {
          return alert("Please specify a valid loss address")
        }

        if (step === 4 && errors.value) {
          return alert("Please send at least 0.01 ether")
        }
        setStep(step + 1);
        setHasSubmitted(false)

    }

    const handleBack = () => {
        setStep(step - 1);
    }

     const handleNameEdit = () => {
        setStep(1)
    }

    const handleDurationEdit = () => {
        setStep(2)
    }

    const handleLossAddressEdit = () => {
        setStep(3)
    }

    const handleValueEdit = () => {
        setStep(4)
    }



useEffect(() => {
  const modal = document.getElementById('my_modal_1');
  
  const handleOutsideClick = (event) => {
    if (event.target === modal) {
      modal.close();
    }
  };

  modal.addEventListener('click', handleOutsideClick);
  
  if (!loading) {
    modal.close();
  }
  
  return () => {
    modal.removeEventListener('click', handleOutsideClick);
  };
}, [loading]);



useEffect(() => {
    let errors = {};
    if (!isAddress(lossAddress)) errors.lossAddress = "Please enter a valid address"
    if (Number(duration) < 3 || !isNumber(Number(duration))) errors.duration = "Please enter a duration three days or over."
    if (!name) errors.name = "Please enter a title"
    if (value < 0.01) errors.value = "Please send more than 0.01 ETH"
    setErrors(errors)
}, [name, value, lossAddress, duration])

const formatAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 5);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };



        const setHabit = async() => {

            setHasSubmitted(true)
            if (Object.values(errors).length) return alert('Please fix errors')
    
        try {
            const tx = await writeContract({
            address: '0x7738c04168bf65206336a9474ce0b9c2ef2a144d',
            abi,
            functionName: 'makeHabit',
            args: [name, duration, lossAddress],
            value: parseEther(value)
            })

            setStep(6)
            setLoading(true)
            await waitForTransaction(tx)
            setTxSuccess(true)
            setHabitCreated(true)

            eventEmitter.emit('habitCreated')

        } catch(e) {
            console.log(e)
        }
        setLoading(false)
        setHasSubmitted(false)
        setErrors({})
        setName('')
        setDuration('')
        setLossAddress('')
        setValue('')
        setStep(1)
    }


  return (
    <>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create a new habit
      </button>
      <dialog
        id="my_modal_1"
        className="fixed inset-0 p-6 bg-white rounded-lg shadow-lg z-50 mx-auto my-auto w-11/12 md:w-3/4 lg:w-1/2"
      >
        <>
          {step === 1 && (
            <>
              <h3 className="font-bold text-lg mb-2">Create a new habit!</h3>
              <p className="py-4 mb-4 text-gray-700">
                Enter a title for your new habit.
              </p>

              <div className="mb-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Title"
                />

                {hasSubmitted && errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>
              <div className="text-right">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleStep}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="font-bold text-lg mb-2">
                Set your habit duration
              </h3>
              <p className="py-4 mb-4 text-gray-700">
                This is the number of days you intend to pursue your habit over{" "}
                <strong>(at least three)</strong>. Be sure to check in every
                day!
              </p>
              <div className="mb-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Number of days"
                />

                {hasSubmitted && errors.duration && (
                  <p className=" mt-2 text-red-500 text-sm">
                    {errors.duration}
                  </p>
                )}
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleBack}
                >
                  Back
                </button>

                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleStep}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-2">Set the loss address</h3>
                <p className="py-4 mb-4 text-gray-700">
                  This is where your ETH will be transferred to should you fail
                  your habit.{" "}
                  <strong>Prevent this by checking in every day!</strong>
                </p>
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                  value={lossAddress}
                  onChange={(e) => setLossAddress(e.target.value)}
                  placeholder="Loss Address"
                />
                {hasSubmitted && errors.lossAddress && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.lossAddress}
                  </p>
                )}
              </div>
              <div className="mt-10 flex justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleBack}
                >
                  Back
                </button>

                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleStep}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              {" "}
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-2">
                  Set your lockup value
                </h3>
                <p className="py-4 mb-4 text-gray-700">
                  This is the ETH you're locking up until you complete your
                  habit. You will either receive it back after you complete your
                  habit or it will be transferred to the provided loss address
                  should you fail.
                </p>
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Value in ETH (Ex. 0.01)"
                />
                {hasSubmitted && errors.value && (
                  <p className="text-red-500 text-sm">{errors.value}</p>
                )}
              </div>
              <div className="mt-10 flex justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleBack}
                >
                  Back
                </button>

                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                  onClick={handleStep}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-6 ">
                Does everything look good?
              </h3>

              <div className="join py-6 px-4 rounded-b-xl w-3/5">
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className=" text-xl mb-2">Title</p>
                      <p className="font-semibold text-lg">{name}</p>
                    </div>
                    <p
                      onClick={handleNameEdit}
                      className=" text-md cursor-pointer hover:text-blue-500"
                    >
                      Edit
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className=" text-xl mb-2">Duration</p>
                      <p className="font-semibold text-lg">{duration} days</p>
                    </div>
                    <p
                      onClick={handleDurationEdit}
                      className=" text-md cursor-pointer hover:text-blue-500"
                    >
                      Edit
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className=" text-xl mb-2">Loss address</p>
                      <p className=" font-semibold text-lg">
                        {formatAddress(lossAddress)}
                      </p>
                    </div>
                    <p
                      onClick={handleLossAddressEdit}
                      className=" text-md cursor-pointer hover:text-blue-500"
                    >
                      Edit
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className=" text-xl mb-2">Value</p>
                      <p className=" font-semibold text-lg">{value} ETH</p>
                    </div>
                    <p
                      onClick={handleValueEdit}
                      className=" text-md cursor-pointer hover:text-blue-500"
                    >
                      Edit
                    </p>
                  </div>

                  <div className="w-full flex justify-center">
                    <button
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
                      onClick={setHabit}
                    >
                      Make Habit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && loading && (
            <div>
              <h3 className="flex justify-center items-center">
                Your habit is being inscribed on the blockchain...
              </h3>
              <style jsx>{`
                @keyframes spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
              `}</style>

              <div className="flex justify-center items-center h-32">
                <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </>
      </dialog>
    </>
  );
}

export default CommitmentModal
