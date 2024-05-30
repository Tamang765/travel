import React from "react"
import { Shadow, TitleMd } from "../../routers"
import { IconButton, Typography } from "@material-tailwind/react"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"

export const Tax = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Service</TitleMd>
        <TaxTable />
      </Shadow>
    </>
  )
}
export const TaxTable = () => {
  const TABLE_ROWS = [
    {
      name: "Laundry",
      services: "Accommodation - 13.00",
    },
    {
      name: "Laundry",
      services: "Accommodation - 13.00",
    },
    {
      name: "Laundry",
      services: "Accommodation - 13.00",
    },
    {
      name: "Laundry",
      services: "Accommodation - 13.00",
    },
    {
      name: "Laundry",
      services: "Accommodation - 13.00",
    },
  ]
  return (
    <table className='w-full min-w-max table-auto text-left mt-8'>
      <thead>
        <tr>
          <th className='border-b text-primary border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              Tax Name
            </Typography>
          </th>
          <th className='border-b text-primary border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              Services And Taxes
            </Typography>
          </th>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70 flex justify-end mx-8'
            >
              Action
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map(({ name, services }, index) => {
          const isLast = index === TABLE_ROWS.length - 1
          const classes = isLast ? "p-3" : "p-3 border-b border-blue-gray-50"

          return (
            <tr key={name}>
              <td className={classes}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {services}
                </Typography>
              </td>
              <td className={`${classes} flex justify-end gap-5`}>
                <IconButton
                  color='green'
                  className='font-medium flex justify-end bg-green-300'
                >
                  <AiFillEdit size={20} />
                </IconButton>
                <IconButton
                  color='red'
                  className='font-medium flex justify-end bg-red-300'
                >
                  <BsFillTrash3Fill size={20} />
                </IconButton>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
