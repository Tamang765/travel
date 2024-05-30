import { Button, Input, Option, Select } from "@material-tailwind/react";
import { FormControl } from "@mui/base";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Shadow, TitleMd } from "../../routers";

export const AddGuest = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Add Guest</TitleMd>
        <AddGuestFrom />
      </Shadow>
    </>
  );
};

export const AddGuestFrom = () => {
  const [value, setValue] = useState();

  const [expanded, setExpanded] = useState(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <form className="my-8 flex flex-col gap-8 w-2/3">
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Full Name<span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full flex items-center gap-5">
            <Input type="text" label="First Name" />
            <Input type="text" label="Last Name" />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Phone<span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full flex items-center gap-5">
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Email<span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full flex items-center gap-5">
            <Input
              placeholder="exampl@gmail.com"
              type="email"
              icon={<AiOutlineMail size={22} />}
            />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Photo
          </h3>
          <div className="w-full flex items-center gap-5">
            <input
              class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-gray-300 text-primary bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              id="formFileLg"
              type="file"
            />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Address
          </h3>
          <div className="w-full grid grid-cols-2 gap-5">
            <Input type="text" label="Address Line 1" />
            <Input type="text" label="Address Line 2" />
            <Input type="text" label="City / District" />
            <Input type="text" label="State / Province" />
            <Input type="text" label="Postal Code" />
            <Select label="Select Country">
              <Option>Nepal</Option>
              <Option>India</Option>
              <Option>China</Option>
            </Select>
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Source <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full flex items-center gap-5">
            <input
              class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-gray-300 text-primary bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              id="formFileLg"
              type="file"
            />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Address <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full flex text-primary flex-col">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  onClick={() => setExpanded(null)}
                  value="female"
                  control={<Radio />}
                  label="Simply Guest"
                />
                <FormControlLabel
                  onClick={handleChange}
                  value="male"
                  control={<Radio />}
                  label="Corporate"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {expanded && (
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Corporate<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>test user</Option>
                <Option>user</Option>
                <Option>Take user </Option>
              </Select>
            </div>
          </div>
        )}
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-64">
            ID Proof <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <input
              class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-gray-300 text-primary bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              id="formFileLg"
              type="file"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <Button color="indigo" size="lg">
            Submit
          </Button>
          <Button color="green" size="lg">
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};
