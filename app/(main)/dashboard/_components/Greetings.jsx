"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Greetings = () => {
    const { user } = useUser()

    return (
        <div className=' bg-gradient-to-br from-white via-purple-500 to-purple-950 bg-clip-text text-transparent pb-10   font-extrabold flex text-xl sm:text-3xl lg:text-5xl ' >
            <h1 className=' capitalize '>Hello ,{user.firstName}</h1>
        </div>

    )
}

export default Greetings
