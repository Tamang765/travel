import React from "react";
import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Shadow, TitleMd } from "../../routers";
import { CiDollar } from "react-icons/ci";

export const NewKot = () => {
  return (
    <>
      <div className="w-3/5">
        <Shadow>
          <TitleMd>New Order</TitleMd>
          <NewKotFrom />
        </Shadow>
      </div>
    </>
  );
};

export const NewKotFrom = () => {
  return (
    <>
      <form className="my-8 flex flex-col gap-8">
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Order Id<span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select">
              <Option>Dinner</Option>
              <Option>Dinner</Option>
              <Option>Take AWay</Option>
            </Select>
          </div>
        </div>
        <div className="flex  ">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Choose Item <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select">
              <Option>Cold Drink</Option>
              <Option>Momo</Option>
            </Select>
          </div>
        </div>

        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-64">Notes</h3>
          <div className="w-full">
            <Textarea type="text" size="md" className="py-3" />
          </div>
        </div>

        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Unit Price <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" placeholder="15.0" size="lg" className="py-3" icon={<CiDollar size={25} />} />
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Quantity <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" size="lg" className="py-3" />
          </div>
        </div>

        <div className="flex ">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Total Price <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" placeholder="####.##" disabled size="lg" className="py-3" icon={<CiDollar size={25} />} />
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
