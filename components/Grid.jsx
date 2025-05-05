"use client"

import { investors } from '@/data/investors'

import React from 'react'
import Divider from './Divider'
import { team } from '@/data/team'

import Trust from './Trust'

const Grid = () => {
    return (
        // investors 
        <div className='max-w-screen mb-30' >
            <div className='bg-no-repeat w-full   mx-auto bg-cover  p-15 mb-10 space-y-10' style={{ backgroundImage: "url('./hero/bg-lines.png')" }}>

                <h1 className={`text-lg sm:text-2xl lg:text-4xl   text-center mx-auto font-extrabold`} >Meet our Investors</h1>
                <h2 className={`text-sm sm:text-xl w-[35%] text-center mx-auto font-light text-neutral-300`} >Built with the trust of world-class founders, industry leaders, and dreamers working to make the web a better place.</h2>
            </div>

            <div  className='  w-2/3 p-4 mb-30  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-13 ' >
                {investors.map(({ name, title, company, image }, index) => (
                    <div key={index} className='w-full mx-auto  space-y-4 border bg-gradient-to-br from-transparent via-[#2f2a50] to-transparent  py-6 ' >
                        <img src={image} className='w-64 h-64 mx-auto hover:scale-110 transform transition duration-200 object-cover' />
                        <div className='flex flex-col justify-center items-center' >

                            <div className='font-semibold'>{name}</div>
                            <div className='text-neutral-300 font-extralight' >{title} / {company}</div>
                        </div>

                    </div>
                ))}
            </div>

            <Divider/>
            <Trust/>
            <Divider />

                {/* /teams */}
            <div className='bg-no-repeat w-full   mx-auto bg-cover mb-10  py-15 space-y-10' style={{ backgroundImage: "url('./hero/bg-lines.png')" }}>

                <h1 className={`text-lg sm:text-2xl lg:text-4xl   text-center mx-auto font-extrabold`} >Meet our Team</h1>
                <h2 className={`text-sm sm:text-xl w-[35%] text-center mx-auto font-light text-neutral-300`} >A driven team of finance experts and tech innovators building smart, secure, and user-first financial solutions.</h2>
            </div>
            <div className=' w-2/3 p-4  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-13 ' >
                {team.map(({ name, role, bio, image }, index) => (
                    <div key={index} className='space-y-2 border bg-gradient-to-br from-transparent via-[#2f2a50] to-transparent p-8  ' >
                        <img src={image} className='hover:scale-110 transform transition duration-200 mx-auto w-64 h-64 object-cover' />
                        <div className='flex flex-col justify-center items-center'>

                            <div className='font-semibold'>{name}</div>
                            <div className='text-neutral-300 font-extralight' >{role}</div>
                            <div className='text-neutral-300 font-extralight' >{bio}</div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Grid