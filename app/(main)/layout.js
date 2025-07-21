import React from 'react'
import { SideBarMain } from './dashboard/_components/SideBarMain'

const layout = ({ children }) => {
  return (
    <div className='max-w-screen text-md  w-screen' >
      <SideBarMain>
        <div className=" h-screen pb-1 flex pt-8 pr-12 flex-1">
          <div
            className="flex h-full overflow-y-auto scroll-hidden w-full flex-1 flex-col gap-2 rounded-2xl  bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-[#1A191E]">
            {children}
          </div>
        </div>

      </SideBarMain>
    </div>
  )
}

export default layout
