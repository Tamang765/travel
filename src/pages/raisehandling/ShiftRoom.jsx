import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import React from "react";
import { Shadow, TitleMd } from "../../routers";

export const ShiftRoom = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Shift Room</TitleMd>
        <ShiftRoomForm />
      </Shadow>
    </>
  );
};
export const ShiftRoomForm = () => {
  return (
    <form className="my-8 flex flex-col gap-8 w-1/2">
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
          Current Room <span className="text-red-500 ml-2">*</span>
        </h3>
        <div className="w-full">
          <Select label="Select Floor" size="lg">
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
            <Option>Others</Option>
          </Select>
        </div>
      </div>
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
          Move To<span className="text-red-500 ml-2">*</span>
        </h3>
        <div className="w-full">
          <Select label="Select Floor" size="lg">
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
            <Option>Others</Option>
          </Select>
        </div>
      </div>
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
          Apply Rate <span className="text-red-500 ml-2">*</span>
        </h3>
        <div className="w-full">
          <Select label="Select Floor" size="lg">
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
            <Option>Others</Option>
          </Select>
        </div>
      </div>
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">Reason</h3>
        <div className="w-full">
          <Textarea type="text" size="lg" className="py-3" />
        </div>
      </div>
      <div className="flex gap-6 mt-8">
        <Button color="indigo">submit</Button>
        <Button color="green">reset</Button>
      </div>
    </form>
  );
};
