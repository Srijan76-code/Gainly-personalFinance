import React from 'react'
import AccountDrawer from '../dashboard/_components/AccountDrawer'
import AccountCard from '../dashboard/_components/AccountCard'


const page = () => {
  return (
    <div className='  space-y-8 p-12   '>

      <div className='space-y-4 mb-16'  >
        <p className=' bg-gradient-to-br from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent   font-bold flex text-sm sm:text-lg lg:text-2xl ' >
        Create Account</p>
        <AccountDrawer />
      </div>

      <div className='space-y-4 ' >
      <p className=' bg-gradient-to-br from-[#A881FF] via-white to-[#A881FF] bg-clip-text text-transparent   font-bold flex text-sm sm:text-lg lg:text-2xl ' >
      All Accounts</p>
        <AccountCard />
      </div>
    </div>
  )
}

export default page
