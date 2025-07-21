"use client"
import { useAuthStore } from '@/stores/useAuthStore';

import React from 'react'

const Greetings = () => {
    const user = useAuthStore((state) => state.user);
    if (!user) return null

    return (
        <div className=' bg-gradient-to-br from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent pb-10   font-bold flex text-sm sm:text-lg lg:text-2xl ' >
            <h1 className=' capitalize '> Hello ,{user.firstName}</h1>
        </div>

    )
}

export default Greetings
