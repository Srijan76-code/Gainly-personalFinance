
import Divider from '@/components/Divider'
import Faq from '@/components/Faq'
import Grid from '@/components/Grid'
import { NavbarDemo } from '@/components/NavbarDemo'
import Title from '@/components/Title'
import Trust from '@/components/Trust'
import { aboutFaq } from '@/data/aboutFaq'

import React from 'react'
const page = () => {
  return (
    <div className=" w-full" >
      <NavbarDemo >

        <Title tw="1/2" subw="1/2" title="It all starts with the user" sub="Gainly is on a mission to solve personal finance management once and for all . We are a globally distributed team dedicated to providing the best customer experience with obsessive attention to every detail." />
        <Divider />
        <Grid />
        <Divider />
        <Trust />
        <Divider />
        <Faq data={aboutFaq} />

      </NavbarDemo>
    </div>
  )
}

export default page
