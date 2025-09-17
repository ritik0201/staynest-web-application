import React from 'react'

export default function page() {
  return (
    <div className='flex justify-center'>
    <div className='pt-30 container'>
        <h1 className='text-4xl font-bold text-purple-700 text-center'>Facility we Provide</h1> 
        <p className='text-center px-40 mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis obcaecati molestias alias quasi iure ratione vel, nam voluptates tempore veniam, explicabo odit tenetur consectetur tempora sint aut quam, at laudantium!</p>
        <div className='flex flex-wrap w-full justify-center mt-15'>
          <div data-aos="zoom-in"data-aos-delay="900" className='h-[200px] w-[200px] flex items-center justify-center mr-4 mt-4 rounded-2xl bg-red-300'></div>
          <div data-aos="zoom-in"data-aos-delay="600" className='h-[200px] w-[200px] flex items-center justify-center mr-4 mt-4 rounded-2xl bg-red-300'></div>
          <div data-aos="zoom-in"data-aos-delay="300"className='h-[200px] w-[200px] flex items-center justify-center mr-4 mt-4 rounded-2xl bg-red-300'></div>
          <div data-aos="zoom-in"data-aos-delay="600"className='h-[200px] w-[200px] flex items-center justify-center mr-4 mt-4 rounded-2xl bg-red-300'></div>
          <div data-aos="zoom-in"data-aos-delay="900"className='h-[200px] w-[200px] flex items-center justify-center mr-4 mt-4 rounded-2xl bg-red-300'></div>
         
        </div>
    </div>
    </div>
  )
}
