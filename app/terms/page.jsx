
import Divider from '@/components/Divider'
import Faq from '@/components/Faq'

import { NavbarDemo } from '@/components/NavbarDemo'
import Title from '@/components/Title'

import { aboutFaq } from '@/data/aboutFaq'

import React from 'react'
const page = () => {
  return (
    <div className=" w-full" >
      <NavbarDemo >

        <Title tw="1/2" subw="1/2" title="Terms of Service" sub="" />
        <Divider />
        <Faq data={aboutFaq} />

      </NavbarDemo>
    </div>
  )
}

export default page
