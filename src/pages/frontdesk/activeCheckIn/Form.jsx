import React from "react";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export const Form = () => {
  return (
    <>
      <form>
        <div className="grid grid-cols-2 gap-7 mt-8">
          <div className="flex flex-col gap-10 ">
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Check In Id <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Input placeholder="1" type="number" size="lg" className="py-3" />
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Guest <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Select label="Select">
                  <Option>Sunil</Option>
                  <Option>App tech</Option>
                </Select>
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Room Type <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Select label="Select">
                  <Option>Single</Option>
                  <Option>Triple</Option>
                  <Option>Deluxe</Option>
                </Select>
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Number Of Adult <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Input type="number" size="lg" className="py-3" />
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">Number Of Child</h3>
              <div className="w-full">
                <Input type="number" size="lg" className="py-3" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 ">
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Rate <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Select label="Select">
                  <Option>Single</Option>
                  <Option>Triple</Option>
                  <Option>Deluxe</Option>
                </Select>
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Room Tariff <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Input placeholder="###" type="number" size="lg" className="py-3" />
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Tax Amount <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Input placeholder="0" type="number" size="lg" className="py-3" />
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Total Amount <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Input placeholder="0" type="number" size="lg" className="py-3" />
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Stay Length <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Input placeholder="1" type="number" size="lg" className="py-3" />
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">Check In Time</h3>
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
                Payment Status <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Select label="Select">
                  <Option>Un Paid</Option>
                  <Option>Partly Paid</Option>
                  <Option>Fully Paid</Option>
                </Select>
              </div>
            </div>
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">
                Status <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="w-full">
                <Select label="Select">
                  <Option>Check In</Option>
                  <Option>Check Out</Option>
                </Select>
              </div>
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
