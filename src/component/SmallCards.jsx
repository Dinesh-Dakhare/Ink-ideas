import React from 'react'

const SmallCards = ({articles}) => {
  return (
    <div>
    <div className='space-y-4 md:grid grid-cols-2 gap-2 lg:grid-cols-3 max-w-[80rem] space-x-4'>
{
    articles?.map((item,index)=>
      <div key={index} className=' shadow-md rounded-3xl bg-white'>
        <img className='object-cover w-full  rounded-t-3xl ' src={item?.image} alt="" />
        <div className="content md:py-2 px-6  ">
            <h1 className='font-medium text-gray-400/70 py-1  md:text-md'>{item?.category}</h1>
        <p className='line-clamp-2 font-semibold text-xl md:text-md'>{item?.title} </p>
        <p className='py-1 md:text-md'><span className='font-medium md:text-md'>{item?.author} </span >{item?.date}</p>
        </div>
    </div>
    )
  }

    </div>
        <h1 className='text-center font-semibold text-gray-400/70 py-1  md:text-md hover:text-black cursor-pointer mt-5 transition-all duration-100 ease-in-out'>View All Article</h1>
    </div>
  )
}

export default SmallCards