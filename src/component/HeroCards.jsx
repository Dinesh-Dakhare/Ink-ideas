import React from 'react'

const HeroCards = ({articles}) => {
const [feature,...other]=articles
  return (
    <div className="container space-y-4 max-w-[80rem]">
<h1 className='font-semibold text-xl  md:text-4xl mb-10'>Latest News</h1>

    <div className='max-w-[80rem] overflow-hidden shadow-lg bg-white  md:flex items-center rounded-xl '>
        <img className='object-cover w-full rounded md:w-1/2 ' src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" alt="" />
        <div className="content md:py-8 px-6 md:w-1/2">
            <h1 className='font-medium text-gray-400/70 py-6  md:text-xl'>FINANCE ADVISER</h1>
        <p className='line-clamp-3  font-semibold text-xl md:text-2xl'>Barely half of banks' own employees would recommend their international payment services to customers </p>
        <p className='py-6'><span className='font-medium md:text-lg'>oliver spain</span> 20 Jan 2022</p>
        </div>
    </div>

  {/* other cards */}

<div className='md:flex gap-2 space-y-4 md:space-y-0'>
  {
    other?.map((article,index)=>
    
      <div key={index} className=' overflow-hidden  shadow-lg rounded  md:flex  md:rounded-xl bg-white  '>
        <img className='object-fill w-full  rounded md:w-[30%]' src={article?.image} alt="" />
        <div className="content md:py-1 px-6 md:w-[70%]">
            <h1 className='font-medium text-gray-400/70 py-1  md:text-sm'>{article?.category}</h1>
        <p className='line-clamp-2 font-semibold text-xl md:text-sm'>{article?.title} </p>
        <p className='py-1 md:text-sm'><span className='font-medium md:text-sm'>{article?.author} </span >{article?.date}</p>
        </div>
    </div>
    )
  }
</div>

    </div>
  )
}

export default HeroCards