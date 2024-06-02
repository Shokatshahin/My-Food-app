import React from 'react'

const Card = (props) => {
  return (
    <div className='h-[500px] w-[300px] bg-red-500 border-zinc-100 flex flex-col items-center justify-center'>
        <img src={props.img} alt="img" width={"250px"} />
        <h1>{props.h1}</h1>
    </div>
  )
}

export default Card