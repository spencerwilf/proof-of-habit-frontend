"use client";
import Head from "next/head";
import Image from "next/image";
import "./globals.css";
import ConnectButton from "./components/ConnectButton";
import { Switch } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Dashboard from "./dashboard/page";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar />

      <div className="flex flex-col min-h-screen">
        <section className="flex-grow flex items-center justify-center py-20">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-content w-full md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome to Proof of Habit
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-4">
                Make a commitment. Stake ETH. Build a habit.
              </p>
              <div className="mt-12">
                <Link href="/dashboard">
                  <button className="font-medium px-6 py-3 text-lg transition duration-300 ease-in-out hover:bg-blue-400 bg-blue-500 text-white rounded-lg">
                    Go to app
                  </button>
                </Link>
              </div>
            </div>
            <div className="image-content w-full md:w-1/2 flex justify-center">
              <Image
                src="/track-employee-productivity-mirr_io_-2.png"
                alt="Visual representation"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
