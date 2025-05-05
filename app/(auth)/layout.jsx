import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="max-w-screen h-screen  flex justify-center pt-32  mx-auto bg-[#07080A] bg-no-repeat bg-cover"
    style={{ backgroundImage: "url('./hero/bg-lines.png')" }}>
        {/* <video className='absolute  -top-116  object-cover ' loop autoPlay muted  src="./auth/bg.mp4"></video> */}
      {children}
    </div>
  )
}

export default AuthLayout
