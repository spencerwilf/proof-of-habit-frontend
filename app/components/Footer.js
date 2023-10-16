import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
<footer className="p-20 bg-gradient-to-r from-blue-300 to-blue-500 text-white">
    <div className="container mx-auto flex justify-between items-start flex-col md:flex-row">
        <div>
            <div className="text-lg font-medium mb-4">
                © 2023 🚀 Spencer Wilfahrt
            </div>
            <ul className="flex space-x-4">
                <li className='text-lg'>
                    <a target='_blank' href="https://www.linkedin.com/in/spencer-wilfahrt-1a4604156/" className="text-white">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </li>
                <li className='text-lg'>
                    <a target='_blank' href="https://github.com/spencerwilf" className="text-white">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
            </ul>
        </div>
        <div>
            <ul className="flex space-x-12 mb-4">
                <li>
                    <a target='_blank' href="https://sepoliafaucet.com/" className="hover:text-blue-200 transition duration-300">Sepolia ETH Faucet</a>
                </li>
                <li>
                    <a target='_blank' href="https://sepolia.etherscan.io/address/0x7738c04168bf65206336a9474ce0b9c2ef2a144d#code" className="hover:text-blue-200 transition duration-300">Contract</a>
                </li>
                <li>
                    <a target='_blank' href="https://github.com/spencerwilf/proof-of-habit-contracts" className="hover:text-blue-200 transition duration-300">Source Code</a>
                </li>
            </ul>
 
        </div>
    </div>
</footer>



  )
}

export default Footer