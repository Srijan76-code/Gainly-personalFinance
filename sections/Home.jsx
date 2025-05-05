
import Cta from '@/components/Cta'
import Divider from '@/components/Divider'
import FadeSlideOnView from '@/components/FadeSlideOnView'
import Hero from '@/components/Hero'
import { NavbarDemo } from '@/components/NavbarDemo'
import Testimonials from '@/components/Testimonials'
import { TimelineDemo } from '@/components/TimelineDemo'
import Trust from '@/components/Trust'
import Working from '@/components/Working'
import React from 'react'

const Home = () => {
    return (
        <div className=" w-full " >
            <NavbarDemo>
                <Hero />
                <Divider />
                <FadeSlideOnView>
                <Trust />
                </FadeSlideOnView>

                <Divider />
                <Working/>
                <Divider />
                <TimelineDemo />
                <Divider />
                <Testimonials />
                <Divider />


            </NavbarDemo>
        </div>
    )
}

export default Home
