import Cta from '@/components/Cta'
import Divider from '@/components/Divider'
import Footer from '@/components/Footer'
import React from 'react'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const layout = ({children}) => {
    return (
        <div className={`inter.className bg-[#050709]`}>
            {children}
            <div className=" w-full " >
                <Cta />
                <Divider />
                <Footer />
            </div>

        </div>
    )
}

export default layout
