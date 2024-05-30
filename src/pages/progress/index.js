import React from "react"
import { Typography } from "@material-tailwind/react"

export const ProgressCard = ({ color, title, total, icon }) => {
  return (
    <>
      <section className={`${color} shadow-md p-5 rounded-md`}>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg text-white font-medium'>{title}</h3>
          <i className='text-white'>{icon}</i>
        </div>
        <br />
        <Typography variant='h3' color='white'>
          {total}
        </Typography>
      </section>
    </>
  )
}
export const ProgressCardMd = ({ bg1, bg2, shadow, title, total, icon }) => {
  return (
    <>
      <section className='bg-white shadow-md p-5 rounded-md'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg text-white font-medium'>{title}</h3>
          <i className='text-white'>{icon}</i>
        </div>
        <br />
        <Typography variant='h3' color='white'>
          {total}
        </Typography>
      </section>
    </>
  )
}
