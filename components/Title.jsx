import React from 'react'

const Title = ({tw="full", title,subw="full",sub}) => {
    return (
        <div className='max-w-screen bg-no-repeat bg-cover' style={{ backgroundImage: "url('./spot.avif)" }}>
            <div className='bg-no-repeat w-full   bg-[#050709] mx-auto bg-cover   py-45 space-y-15' style={{ backgroundImage: "url('./hero/bg-lines.png')" }}>

                <h1 className={`text-3xl sm:text-5xl lg:text-7xl w-${tw}  bg-gradient-to-r from-white via-[#a27af9] to-[#2f2b56] bg-clip-text text-transparent  text-center mx-auto font-extrabold`} >{title}</h1>
                <h2 className={`text-sm sm:text-xl w-${subw} text-center mx-auto font-light text-neutral-300`} >{sub}</h2>
            </div>

        </div>
    )
}

export default Title
