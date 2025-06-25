import Community from '@/components/Community'
import Connect from '@/components/Connect'
import Divider from '@/components/Divider'
import { NavbarDemo } from '@/components/NavbarDemo'
import React from 'react'

const page = () => {
  return (
    <div className=" w-full " >
    <NavbarDemo>
      <Connect/>
      <Divider/>
        <Community/>
        <Divider/>
    </NavbarDemo>
</div>
  )
}

export default page
