import Image from 'next/image'
import React from 'react'

const Trust = () => {
    return (
        <div className="max-w-screen mt-20  w-5xl px-12 sm:px-24 h-48 sm:h-96  mx-auto bg-[#07080A] bg-no-repeat bg-cover text-white flex   flex-col space-y-3 md:space-y-10 items-center justify-between"
            style={{ backgroundImage: "url('./hero/bg-lines.png')" }}>
            <h2 className="mx-auto  text-2xl text-center font-bold md:text-3xl  text-black dark:text-white max-w-4xl">
                Why trust us 🤔
            </h2>
            <div className='text-center   w-full flex justify-between '>
                <div className='pb-50 sm:pb-35'  >
                    <p className='text-xl sm:text-3xl  font-bold' >
                        {/* <Image width={640} height={640}  className='-z-20 bg-transparent w-8 h-8' src="/trust/a1.gif" alt="" /> */}
                        <span>100k+</span>
                        </p>
                    <p className='text-sm sm:text-lg font-light ' >Active Users</p>
                </div>
                <div className='pb-50 sm:pb-35'  >
                    <p className='text-xl sm:text-3xl font-bold' >$1B+</p>
                    <p className='text-sm sm:text-lg font-light ' >Transactions Tracked</p>
                </div>
                <div className='pb-50 sm:pb-35'  >
                    <p className='text-xl sm:text-3xl font-bold' >4.8/5</p>
                    <p className='text-sm sm:text-lg font-light ' >User Rating</p>
                </div>

            </div>
        </div>
    )
}

export default Trust
