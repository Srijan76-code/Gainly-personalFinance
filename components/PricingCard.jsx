"use client"
import { pricingPlans } from '@/data/pricing'
import React from 'react'
import Button from './styleComponent/Button'
import { Check } from 'lucide-react';
import { Carousel } from './ui/apple-cards-carousel';

const PricingCard = () => {
  const cards = pricingPlans.map(({ id, title, price, image, video, subtitle, features, buttonText }, index) => (
    <div key={id} className='bg-[#050709] relative  mx-auto w-2xl h-230 overflow-hidden'>
      <video className="absolute bg-[#050709] rounded-4xl inset-0 w-full mx-auto h-full object-cover" playsInline autoPlay muted loop src={video}></video>
     


      <div className="w-80 pr-10 absolute inset-0 flex flex-col justify-center mx-auto space-y-8">
        <div className='space-y-1'>
          <h1 className="font-semibold text-xl md:text-3xl text-white">{title}</h1>
          <p className="font-extralight text-white">{subtitle}</p>
        </div>
        <p className="font-bold text-3xl md:text-5xl text-white">{price}</p>
        <Button bg="transparent w-3/4">{buttonText}</Button>

        <div className='font-light space-y-1 text-white'>
          {features.map((v, i) => (
            <div key={i} className='flex items-center space-x-3'>
              <Check className='w-4 h-4' />
              <p>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  return  <Carousel items={cards}/>;
};

export default PricingCard
