"use client"
import React from 'react'
import styled from "styled-components";
import { ConnectKitButton } from 'connectkit'
const StyledButton = styled.button`
    background-color: #3b82f6;
    color: #ffffff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: background-color 300ms ease-in-out;

    &:hover {
        background-color: #60a5fa;
    }

    &:active {
        background-color: #3b82f6;
    }
`;

// Define a container to hold your button and center it
const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
`;
const StyledConnectButton = () => {
    
  return (
    <CenteredContainer>
        <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <StyledButton onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </StyledButton>
        );
      }}
    </ConnectKitButton.Custom>
    </CenteredContainer>
  )
}

export default StyledConnectButton