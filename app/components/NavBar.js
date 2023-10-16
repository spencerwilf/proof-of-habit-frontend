import React from 'react'
import ConnectButton from './ConnectButton'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const NavBar = () => {
  return (
          <header className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
            <Link href='/'>
          <h1 className="text-2xl font-bold">Proof of Habit</h1>
          </Link>
          <nav>
    
            <ul className="flex space-x-8 text-2xl">
   
              <li><a target='_blank' href="https://www.linkedin.com/in/spencer-wilfahrt-1a4604156/" className="text-white">
                <FontAwesomeIcon icon={faLinkedin} />
                </a></li>
              <li><a target='_blank' href="https://github.com/spencerwilf" className="text-white">
                <FontAwesomeIcon icon={faGithub} />
                </a></li>
              <li><a target='_blank' href="https://sepolia.etherscan.io/address/0x7738c04168bf65206336a9474ce0b9c2ef2a144d#code" className="text-white">
                 <FontAwesomeIcon icon={faCode} />
                </a></li>
            </ul>
          </nav>
          <ConnectButton/>
        </div>
      </header>
  )
}

export default NavBar