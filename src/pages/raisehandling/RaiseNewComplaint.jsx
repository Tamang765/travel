import { Button, Input, Option, Radio, Select, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { Shadow, TitleMd } from "../../routers";

export const RaiseNewComplaint = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Raise New Complaint</TitleMd>
        <RaiseNewComplaintForm />
      </Shadow>
    </>
  );
};

export const RaiseNewComplaintForm = () => {
  const [open, setOpen] = useState(false);
  return (
    <form className="my-8 flex flex-col gap-8 w-1/2">
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
          Room <span className="text-red-500 ml-2">*</span>
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
          Type <span className="text-red-500 ml-2">*</span>
        </h3>
        <div className="w-full text-primary flex flex-col gap-3">
          <Radio name="type" label="Maintenance Issue" onClick={() => setOpen(null)} />
          <Radio name="type" label="Room Shifting" onClick={() => setOpen(null)} />
          <Radio name="type" label="Other" onClick={() => setOpen(!open)} />
          {open && <Input type="text" />}
        </div>
      </div>
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">Description</h3>
        <div className="w-full">
          <Textarea type="text" size="lg" className="py-3" />
        </div>
      </div>
      <div className="flex">
        <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
          Received by <span className="text-red-500 ml-2">*</span>
        </h3>
        <div className="w-full">
          <Input type="text" size="lg" />
        </div>
      </div>
      <div className="flex gap-6 mt-8">
        <Button color="indigo">submit</Button>
        <Button color="green">reset</Button>
      </div>
    </form>
  );
};
