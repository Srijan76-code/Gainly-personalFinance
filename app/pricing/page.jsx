
import Divider from '@/components/Divider'
import { NavbarDemo } from '@/components/NavbarDemo'
import PricingCard from '@/components/PricingCard'
import Title from '@/components/Title'
import React from 'react'
const page = () => {
  return (
    <div className=" max-w-screen bg-[#050709]" >
      <NavbarDemo bg="[#050709]">
        <Title tw="1/3" subw="1/2" title="Pricing that scales with you" sub="Our pricing is designed to grow with your needs — start small, upgrade anytime, and pay only for what you use." />
        

        
        <div className='bg-[#050709] mb-30' >
        <PricingCard />
        </div>
        <Divider/>
      
       
      </NavbarDemo>
    </div>
  )
}

export default page
