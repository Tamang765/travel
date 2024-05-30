import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TbCurrencyDollar } from "react-icons/tb";
import { Input, Button, Checkbox, Select, Option } from "@material-tailwind/react";

export const Form = ({ show }) => {
  const [openCheckBox, setopenCheckBox] = useState(false);

  return (
    <>
      <form className="mt-8 mb-2">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Check In <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Check In" slotProps={{ textField: { fullWidth: true, size: "medium" } }} />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Check Out <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Check Out" slotProps={{ textField: { fullWidth: true, size: "medium" } }} />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Number Of Rooms <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input placeholder="1" type="number" size="lg" className="py-3" />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Number Of Adults <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input placeholder="1" type="number" size="lg" className="py-3" />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-64">
              Number Of Child <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input placeholder="1" type="number" size="lg" className="py-3" />
            </div>
          </div>
        </div>
        <div className="my-3 text-primary">
          <Checkbox label="Confirm Reservation" value={openCheckBox} color="indigo" onClick={() => setopenCheckBox(!openCheckBox)} />
        </div>

        {openCheckBox && (
          <div className="w-[49%] mt-7">
            <div className="flex">
              <h3 className="text-primary capitalize font-medium flex w-64">Room Type</h3>
              <div className="w-full">
                <Select label="Select Room Type" size="lg">
                  <Option>Room Type</Option>
                  <Option>No Found</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
            </div>
            <div className="flex my-8">
              <h3 className="text-primary capitalize font-medium flex w-64">Choose Rooms</h3>
              <div className="w-full">
                <Select label="Choose Room" size="lg">
                  <Option>Room Type</Option>
                  <Option>No Found</Option>
                </Select>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-5">
              <h2 className="text-primary text-lg font-medium">Rate</h2>

              <div className="flex my-8">
                <h3 className="text-primary capitalize font-medium flex w-64">Select Rate</h3>
                <div className="w-full">
                  <Select label="Select Rate" size="lg">
                    <Option>Room Type</Option>
                    <Option>No Found</Option>
                  </Select>
                </div>
              </div>
              <div className="flex my-8">
                <h3 className="text-primary capitalize font-medium flex w-64">Room Tariff</h3>
                <div className="w-full">
                  <Input placeholder="####" type="number" size="lg" className="py-3" disabled icon={<TbCurrencyDollar />} />
                </div>
              </div>
              <div className="flex my-8">
                <h3 className="text-primary capitalize font-medium flex w-64">Tax Amount</h3>
                <div className="w-full">
                  <Input placeholder="1" type="number" size="lg" className="py-3" disabled icon={<TbCurrencyDollar />} />
                </div>
              </div>
              <div className="flex my-8">
                <h3 className="text-primary capitalize font-medium flex w-64">Total Amount</h3>
                <div className="w-full">
                  <Input placeholder="####" type="number" size="lg" className="py-3" disabled icon={<TbCurrencyDollar />} />
                </div>
              </div>
              <div className="flex my-8">
                <h3 className="text-primary capitalize font-medium flex w-64">Advance Amount</h3>
                <div className="w-full">
                  <Input placeholder="1" type="number" size="lg" className="py-3" icon={<TbCurrencyDollar />} />
                </div>
              </div>
            </div>
          </div>
        )}

        <Button className="mt-6" color="indigo" size="lg">
          Submit
        </Button>
      </form>
    </>
  );
};
