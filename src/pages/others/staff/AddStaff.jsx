import React, { useState } from "react"
import { Shadow, TitleMd } from "../../../routers"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { AiOutlineMail } from "react-icons/ai"

export const AddStaff = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Add Staff</TitleMd>
        <AddStaffFrom />
      </Shadow>
    </>
  )
}

export const AddStaffFrom = () => {
  const [value, setValue] = useState()
  return (
    <>
      <form className='my-8 flex flex-col gap-8 w-2/3'>
        <div className='flex'>
          <h3 className='text-primary capitalize font-medium flex w-64'>
            role<span className='text-red-500 ml-2'>*</span>
          </h3>
          <div className='w-full'>
            <Input type='text' label='role' />
          </div>
        </div>
        <div className='flex'>
          <h3 className='text-primary capitalize font-medium flex w-64'>
            Name<span className='text-red-500 ml-2'>*</span>
          </h3>
          <div className='w-full flex items-center gap-5'>
            <Input type='text' label='First Name' />
            <Input type='text' label='Last Name' />
          </div>
        </div>
        <div className='flex'>
          <h3 className='text-primary capitalize font-medium flex w-64'>
            Phone<span className='text-red-500 ml-2'>*</span>
          </h3>
          <div className='w-full flex items-center gap-5'>
            <PhoneInput
              placeholder='Enter phone number'
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className='flex'>
          <h3 className='text-primary capitalize font-medium flex w-64'>
            Email<span className='text-red-500 ml-2'>*</span>
          </h3>
          <div className='w-full flex items-center gap-5'>
            <Input
              placeholder='exampl@gmail.com'
              type='email'
              icon={<AiOutlineMail size={22} />}
            />
          </div>
        </div>
        <div className='flex'>
          <h3 className='text-primary capitalize font-medium flex w-64'>
            Address
          </h3>
          <div className='w-full grid grid-cols-2 gap-5'>
            <Input type='text' label='Address Line 1' />
            <Input type='text' label='Address Line 2' />
            <Input type='text' label='City / District' />
            <Input type='text' label='State / Province' />
            <Input type='text' label='Postal Code' />
            <Select label='Select Country'>
              <Option>Nepal</Option>
              <Option>India</Option>
              <Option>China</Option>
            </Select>
          </div>
        </div>
        <div className='flex'>
          <h3 className='text-primary capitalize font-medium flex w-64'>
            ID Proof <span className='text-red-500 ml-2'>*</span>
          </h3>
          <div className='w-full'>
            <input
              class='relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-gray-300 text-primary bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
              id='formFileLg'
              type='file'
            />
          </div>
        </div>
        <div className='flex gap-5'>
          <Button color='indigo'>Submit</Button>
          <Button color='red' className='bg-red-300'>
            Reset
          </Button>
        </div>
      </form>
    </>
  )
}
