import React from "react";
import { Shadow, TitleMd } from "../../routers";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { CiDollar } from "react-icons/ci";
import { Checkbox, FormControlLabel } from "@mui/material";
import { BiUserCircle } from "react-icons/bi";
export const AddCorporatePayment = () => {
  return (
    <>
      <Shadow>
        <div className="w-3/5">
          <TitleMd>Add Corporate Payment</TitleMd>
          <AddCorporatePaymentFrom />
        </div>
      </Shadow>
    </>
  );
};

export const AddCorporatePaymentFrom = () => {
  return (
    <>
      <form className="my-8 flex flex-col gap-5">
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Payment On <span className="text-red-500 ml-2">*</span>
          </h3>
          <Input type="datetime-local" />
        </div>
        <div className="flex  ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Select Corporate <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select">
              <Option>Cold Drink</Option>
              <Option>Momo</Option>
            </Select>
            <span className="text-[12px] text-gray-500">First select corporate to know booking ids</span>
          </div>
        </div>
        <div className="flex  ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Check Ins To Be Covered <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select">
              <Option>Cold Drink</Option>
              <Option>Momo</Option>
            </Select>
          </div>
        </div>

        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Room Tariff <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Restaurant Charge <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Service Charge <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Amenity Charge <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Total Amount <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Prepaid Amount <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Remaining Balance <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>

        <div className="w-full">
          <div className="text-primary capitalize font-semobold flex items-center">
            <FormControlLabel control={<Checkbox />} label="Amount Received" />
            <span className="text-red-500 ml-2">*</span>
          </div>
          <span className="text-[12px] text-gray-500">By Clicking here you are agree to complete this payment.</span>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-96">
            Incharge <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input disabled placeholder="admin" size="lg" className="py-3" icon={<BiUserCircle size={25} />} />
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
