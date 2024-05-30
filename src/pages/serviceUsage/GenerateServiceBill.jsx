import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";
import { CiDollar } from "react-icons/ci";
import { Shadow, TitleMd } from "../../routers";

export const GenerateServiceBill = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Generate Service Bill</TitleMd>
        <GenerateServiceBillForm />
      </Shadow>
    </>
  );
};

export const GenerateServiceBillForm = () => {
  return (
    <>
      <form className="w-2/3">
        <div className="my-8 flex gap-7 flex-col">
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">Date-Time</h3>
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker", "MobileDateTimePicker", "DesktopDateTimePicker", "StaticDateTimePicker"]}>
                  <MobileDateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Room <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full flex items-center gap-5">
              <Select label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Choose Service <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full flex items-center gap-5">
              <Select label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Usage Details<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full flex items-center gap-5">
              <Textarea type="text" />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Charge<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full flex items-center gap-5">
              <Input type="text" placeholder="####.##" disabled icon={<CiDollar size={22} />} />
            </div>
          </div>

          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">Tax Amount</h3>
            <div className="w-full flex items-center gap-5">
              <Input type="text" placeholder="####.##" disabled icon={<CiDollar size={22} />} />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Total<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full flex items-center gap-5">
              <Input type="text" placeholder="####.##" disabled icon={<CiDollar size={22} />} />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Pre Paid Amount<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full flex items-center gap-5">
              <Input type="text" placeholder="####.##" disabled icon={<CiDollar size={22} />} />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <Button color="indigo">Submit</Button>
          <Button color="gray" variant="outlined">
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};
