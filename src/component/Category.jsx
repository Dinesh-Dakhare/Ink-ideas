import React from 'react'

const Category = ({category}) => {
  return (
    <div className='flex items-center gap-10'>
      
      {
        category?.map((item,index)=><button onClick={()=>console.log(item)} className="border  border-gray-400 px-4 py-1 rounded-4xl bg-white hover:bg-[#145BCC] hover:text-white" key={index} >{item}</button>)
        }
        </div>
  )
}

export default Category