import React from 'react'
import ConnectButton from './ConnectButton'
import Link from 'next/link'

const NavBar = () => {
  return (
          <header className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
            <Link href='/'>
          <h1 className="text-2xl font-bold">Proof of Habit</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/info" className="text-white">Learn</a></li>
              <li><a href="#" className="text-white">Opportunities</a></li>
              <li><a href="#" className="text-white">Community</a></li>
            </ul>
          </nav>
          <ConnectButton/>
        </div>
      </header>
  )
}

export default NavBar