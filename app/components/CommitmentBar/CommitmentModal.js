"use client"
import React, {useEffect, useState} from 'react'
import abi from "../../../abi.json"
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { parseEther, isAddress } from 'viem';


const CommitmentModal = () => {


    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [lossAddress, setLossAddress] = useState("")
    const [value, setValue] = useState("")
    
    const [loading, setLoading] = useState(false)
    const [txSuccess, setTxSuccess] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

        const isNumber = (input) => {
        const regex = /^\d+$/;
        return regex.test(input);
    }

    useEffect(() => {
  const modal = document.getElementById('my_modal_1');
  
  const handleOutsideClick = (event) => {
    if (event.target === modal) {
      modal.close();
    }
  };

  modal.addEventListener('click', handleOutsideClick);
  
  return () => {
    modal.removeEventListener('click', handleOutsideClick);
  };
}, []);


useEffect(() => {
    let errors = {};
    if (!isAddress(lossAddress)) errors.lossAddress = "Please enter a valid address"
    if (duration < 3 || !isNumber(duration)) errors.duration = "Please enter a duration three days or over."
    if (!name) errors.name = "Please enter a title"
    if (value < 0.01) errors.value = "Please send more than 0.01 ETH"
    setErrors(errors)
}, [name, value, lossAddress])



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

            setLoading(true)
            await waitForTransaction(tx)
            setTxSuccess(true)

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
    }


  return (
<>
  <button 
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
    onClick={() => document.getElementById('my_modal_1').showModal()}
  >
    Create a new habit
  </button>
  <dialog id="my_modal_1" className="fixed inset-0 p-6 bg-white rounded-lg shadow-lg z-50 mx-auto my-auto w-11/12 md:w-3/4 lg:w-1/2">
    {!loading ? ( <><h3 className="font-bold text-lg mb-2">Create a new habit!</h3>
    <p className="py-4 mb-4 text-gray-700">Use the blockchain to keep you accountable.</p>
    <div >
  <div className="mb-4">
    <input 
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      value={name} 
      onChange={e => setName(e.target.value)} 
      placeholder='Name'
    />
     {hasSubmitted && errors.name && (<p className="text-red-500 text-sm">{errors.name}</p>)}
  </div>

  <div className="mb-4">
    <input 
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      value={duration} 
      onChange={e => setDuration(e.target.value)} 
      placeholder='Number of days'
    />
    {hasSubmitted && errors.duration && (<p className="text-red-500 text-sm">{errors.duration}</p>)}
  </div>

  <div className="mb-4">
    <input 
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      value={lossAddress} 
      onChange={e => setLossAddress(e.target.value)} 
      placeholder='Loss Address'
    />
    {hasSubmitted && errors.lossAddress && (<p className="text-red-500 text-sm">{errors.lossAddress}</p>)}
  </div>

  <div className="mb-4">
    <input 
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      value={value} 
      onChange={e => setValue(e.target.value)} 
      placeholder='Value'
    />
    {hasSubmitted && errors.value && (<p className="text-red-500 text-sm">{errors.value}</p>)}
  </div>

  <div className="text-right">
   <button 
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-400"
    onClick={setHabit}
>
    Make Habit
</button>

  </div>
</div>
    <div className="text-right">
      <form method="dialog">
       
      </form>
    </div> </>) : (
    <div>
    <h3 className='flex justify-center items-center'>Your habit is being inscribed on the blockchain...</h3>
    <style jsx>{`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}</style>

<div className="flex justify-center items-center h-32">
  <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
</div>
    </div>
    )}
  </dialog>
</>


  )
}

export default CommitmentModal