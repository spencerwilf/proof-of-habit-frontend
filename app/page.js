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
import { ClipArt } from '../public/track-employee-productivity-mirr_io_-2.png'

export default function Home() {


  return (

    <>
    <NavBar/>

<section className="py-20">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="text-content w-full md:w-1/2 mb-10 md:mb-0">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Invest in Yourself</h2>
      <p className="text-xl md:text-2xl text-gray-700 mb-4">Make a commitment. Stake ETH. Build a habit.</p>
      <div className="mt-12">  {/* Increased margin-top here */}
        <Link href='/dashboard'>
          <button className="px-6 py-3 text-lg transition duration-300 ease-in-out hover:bg-blue-400 bg-blue-500 text-white rounded-lg">Go to app</button>
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
      <section className="flex-grow flex items-center justify-center text-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className='flex flex-col items-center'>
          <h2 className="text-4xl mb-2 font-bold">Make your habits stick</h2>
          <p className="text-lg mb-4">Make a commitment. Stake ETH. Build a habit.</p>
          <Link href='/dashboard'>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Go to app</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Repeat for each feature */}
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <h3 className="text-xl mb-2 font-bold">Feature {i}</h3>
              <p>Details about this feature.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Community Chat</h2>
          <p className="text-lg mb-4">Learn, Build, and Earn with our community.</p>
          {/* Other community-related content */}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Footer content such as navigation links and subscription form */}
        </div>
      </footer>
    </div>

    </>
    

  )
}
