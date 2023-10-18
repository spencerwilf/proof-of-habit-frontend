"use client"
import Head from 'next/head'
import Image from 'next/image'
import './globals.css'
import ConnectButton from './components/ConnectButton'
import { Switch } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Dashboard from './dashboard/page'
import Link from 'next/link'
import Footer from './components/Footer'


export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(1);


  function handleArrowClick(direction) {
    let nextSlide = currentSlide + direction;
    if (nextSlide > 4) nextSlide = 1;
    if (nextSlide < 1) nextSlide = 4;
    setCurrentSlide(nextSlide);
}



  return (

    <>
    <NavBar/>

<section className="py-20">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="text-content w-full md:w-1/2 mb-10 md:mb-0">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Proof of Habit</h2>
      <p className="text-xl md:text-2xl text-gray-700 mb-4">Make a commitment. Stake ETH. Build a habit.</p>
      <div className="mt-12">  {/* Increased margin-top here */}
        <Link href='/dashboard'>
          <button className="font-medium px-6 py-3 text-lg transition duration-300 ease-in-out hover:bg-blue-400 bg-blue-500 text-white rounded-lg">Go to app</button>
        </Link>
      </div>
    </div>
    <div className="image-content w-full md:w-1/2 flex justify-center">
      <Image
        src='/track-employee-productivity-mirr_io_-2.png'
        alt="Visual representation"
        width={500}
        height={500}
      />
    </div>
  </div>
</section>






      <div className="flex flex-col min-h-screen">
      {/* Header */}


      {/* Hero Section */}
          <section className="flex-grow flex items-center justify-center text-center p-4 bg-gradient-to-r from-blue-300 to-blue-500 text-white">
    <div className='relative flex flex-col items-center w-full max-w-screen-xl mx-auto py-10 h-[500px]'>
        <div className="arrow-container absolute top-1/2 left-0 ml-4 flex items-center transform -translate-y-1/2">
            <button className="btn btn-circle" onClick={() => handleArrowClick(-1)}>❮</button>
        </div>
        <div className="carousel w-full">
            <div id={`slide${currentSlide}`} className="carousel-item flex flex-col items-center justify-center w-full">
                {currentSlide === 1 && (
                    <>
                        <h2 className="text-3xl font-extrabold mb-6 text-center">Step 1: Create a new habit</h2>
                        <img src="/workout.png" className="w-90 h-60 p-5 mb-4" />
                        <p className="mb-4">Register a personal habit goal on the blockchain to track your progress.</p>
                    </>
                )}
                {currentSlide === 2 && (
                    <>
                        <h2 className="text-3xl font-extrabold mb-6 text-center">Step 2: Stake ETH</h2>
                        <img src="/eth.png" className="w-90 h-60 p-5 mb-4" />
                        <p className="mb-4">Pledge a certain amount of ETH as a commitment to achieving your habit goal.</p>
                    </>
                )}
                {currentSlide === 3 && (
                    <>
                        <h2 className="text-3xl font-extrabold mb-6 text-center">Step 3: Check in daily until you reach your goal</h2>
                        <img src="/computer.png" className="w-90 h-60 p-5 mb-4" />
                        <p className="mb-4">Daily check-ins to mark your progress until your habit goal is reached.</p>
                    </>
                )}
                {currentSlide === 4 && (
                    <>
                        <h2 className="text-3xl font-extrabold mb-6 text-center">Step 4: Get your ETH back</h2>
                        <img src="/money.png" className="w-90 h-60 p-5 mb-4" />
                        <p className="mb-4">Upon successful completion of your habit goal, reclaim your staked ETH.</p>
                    </>
                )}
            </div>
        </div>
        <div className="arrow-container absolute top-1/2 right-0 mr-4 flex items-center transform -translate-y-1/2">
            <button className="btn btn-circle" onClick={() => handleArrowClick(1)}>❯</button>
        </div>
    </div>
</section>


      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
         
<div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white flex flex-col items-center justify-center p-4 bg-white rounded shadow h-[300px]">
  <h3 className="text-2xl font-bold text-center mt-4 mb-4">Decentralized</h3>
  <img src="/decentralized.png" className="object-contain w-full h-40 p-2 mb-4" />
 <p>Built on the Ethereum network.</p>
</div>

<div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white flex flex-col items-center justify-center p-4 bg-white rounded shadow h-[300px]">
  <h3 className="text-2xl font-bold text-center mt-4 mb-4">Trustless</h3>
  <img src="/trustless.png" className="object-contain w-full h-40 p-2 mb-4" />
 <p>Don't trust us or our servers. Trust the code.</p>
</div>

<div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white flex flex-col items-center justify-center p-4 bg-white rounded shadow h-[300px]">
  <h3 className="text-2xl font-bold text-center mt-4 mb-4">Cutting edge</h3>
  <img src="/lightning.png" className="object-contain w-full h-40 p-2 mb-4" />
<p>Built with the latest and greatest blockchain technology</p>
</div>


      
        </div>
      </section>



      <Footer/>

    </div>

    </>
    

  )
}
