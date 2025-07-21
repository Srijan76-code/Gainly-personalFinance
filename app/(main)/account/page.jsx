import React from 'react'
import AccountDrawer from '../dashboard/_components/AccountDrawer'
import AccountCard from '../dashboard/_components/AccountCard'


const page = () => {
  return (
    <div className='  space-y-8 p-12   '>
       
      <div className=''  >
      <AccountDrawer/>
    </div>
        
      <div>

      <AccountCard/>
      </div>
    </div>
  )
}

export default page
