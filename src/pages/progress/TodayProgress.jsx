import React from "react"
import { ProgressCard } from "./index"
import { BiMoney } from "react-icons/bi"
import { GiPayMoney } from "react-icons/gi"
import { CiPercent } from "react-icons/ci"
import { FaUsers } from "react-icons/fa"

export const TodayProgress = () => {
  return (
    <>
      <section>
        <div className='grid grid-cols-4 gap-5 xl:grid-cols-3'>
          <ProgressCard color='bg-[#9b59b6]' title=" Today's Income" icon={<BiMoney size={50} />} total='2323.00' />
          <ProgressCard color='bg-[#ee5253]' title='Revenue Per Room' icon={<GiPayMoney size={50} />} total='464.60' />
          <ProgressCard color='bg-[#10ac84]' title='Occupancy Rate' icon={<CiPercent size={50} />} total='20.00' />
          <ProgressCard color='bg-[#ff9f43]' title='No. Of Guests' icon={<FaUsers size={50} />} total='5' />
        </div>
      </section>
    </>
  )
}
