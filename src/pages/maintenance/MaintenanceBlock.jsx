import React from "react";
import { Shadow, TitleMd } from "../../routers";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { DialogTitle, Divider } from "@mui/material";

export const MaintenanceBlock = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Maintenance Block</TitleMd>
        <MaintenanceBlockFrom />
      </Shadow>
    </>
  );
};

export const MaintenanceBlockFrom = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <form className="mt-8 flex flex-col gap-8 w-2/3">
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Room <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select Floor" size="lg">
              <Option>101</Option>
              <Option>200</Option>
              <Option>300</Option>
              <Option>400</Option>
              <Option>500</Option>
            </Select>
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Maintenance Type <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select Floor" size="lg">
              <Option>Air Condition</Option>
              <Option>200</Option>
              <Option>300</Option>
              <Button onClick={handleClickOpen} className="flex items-center gap-3 w-full" color="indigo" ripple={false}>
                <AiOutlinePlus strokeWidth={2} className="h-5 w-5" /> Add New Room Type
              </Button>
            </Select>
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Block From <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="date" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Block To <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="date" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">Description</h3>
          <div className="w-full">
            <Textarea type="text" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <Button color="indigo">Submit</Button>
          <Button color="green">reset</Button>
        </div>
      </form>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Add Maintenance Type</DialogTitle>
        <Divider />
        <DialogContent>
          <PopupForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="indigo">
            add
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
  return <Slide direction="down" ref={ref} {...props} />;
});

export const PopupForm = () => {
  return (
    <>
      <form className="mt-8 mb-2">
        <div className="flex my-8">
          <h3 className="text-primary capitalize font-medium flex w-72 text-sm">
            Type <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input type="number" size="lg" className="py-3" />
            <span className="text-s">Eg : Air Condition, Plumbing</span>
          </div>
        </div>
      </form>
    </>
  );
};
