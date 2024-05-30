import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Checkbox, DialogTitle, Divider, FormControlLabel, TextField } from "@mui/material";

export const RoomForm = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <form className="mt-8 mb-2">
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Floor <span className="text-red-500 ml-2">*</span>
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
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Room Number <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Room Type <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select Room Type" size="lg">
              <Option>Single</Option>
              <Option>Deluxe</Option>
              <Option>Triple</Option> <br />
              <Button onClick={handleClickOpen} className="flex items-center gap-3 w-full" color="indigo" ripple={false}>
                <AiOutlinePlus strokeWidth={2} className="h-5 w-5" /> Add New Room Type
              </Button>
            </Select>
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">Dial Number</h3>
          <div className="w-full">
            <Input type="text" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <Button size="lg" color="indigo">
            add
          </Button>
          <Button size="lg" color="green">
            reset
          </Button>
        </div>
      </form>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Add Room Type</DialogTitle>
        <Divider />
        <DialogContent>
          <PopupForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="indigo">
            submit
          </Button>
          <Button onClick={handleClose} color="green">
            reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PopupForm = () => {
  return (
    <>
      <form className="mt-8 mb-2">
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Type Name <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" size="lg" className="py-3" />
            <span className="text-sm">Eg : Deluxe, Standard</span>
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Bed Type <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select" size="lg">
              <Option>Single</Option>
              <Option>Double</Option>
              <Option>Triple</Option>
              <Option>Quad</Option>
              <Option>Queen</Option>
              <Option>King</Option>
              <Option>Other</Option>
            </Select>
          </div>
        </div>

        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Number Of Adults <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Number Of Child <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" placeholder="0" size="lg" className="py-3" />
            <span className="text-sm">Without any additional charge</span>
          </div>
        </div>
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Number Of Extra Adults <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" placeholder="0" size="lg" className="py-3" />
            <span className="text-sm">With additional charge</span>
          </div>
        </div>
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Image <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            {/* <input className="p-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="multiple_files" type="file" multiple /> */}
            <TextField type="file" />
          </div>
        </div>
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Room Amenities <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select" size="lg">
              <Option>Single</Option>
              <Option>Double</Option>
              <Option>Triple</Option>
              <Option>Quad</Option>
              <Option>Queen</Option>
              <Option>King</Option>
              <Option>Other</Option>
            </Select>
          </div>
        </div>
        <div className="flex my-8">
          <FormControlLabel control={<Checkbox defaultChecked />} label="With Ac" />
        </div>
      </form>
    </>
  );
};
