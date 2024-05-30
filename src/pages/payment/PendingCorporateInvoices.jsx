import React from "react";
import { Shadow, TitleMd } from "../../routers";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { CiDollar } from "react-icons/ci";
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide } from "@mui/material";

export const PendingCorporateInvoices = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pendingData = false;
  return (
    <>
      <Shadow>
        <TitleMd>Pending Corporate Invoices</TitleMd>
        {pendingData ? (
          <h1>Table</h1>
        ) : (
          <div className="min-h-[75vh] flex items-center justify-center flex-col gap-8">
            <TitleMd>No records match your specified criteria!</TitleMd>

            <div className="flex gap-5 items-center">
              <Button color="indigo" size="lg" onClick={handleClickOpen}>
                Add a record
              </Button>
              <span> or</span>
              <Button color="gray" size="lg">
                Import Data
              </Button>
            </div>

            <Dialog maxWidth open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
              <DialogTitle> Check In Details Form</DialogTitle>
              <Divider />
              <DialogContent>
                <PendingCorporateInvoicesFrom />
              </DialogContent>
              <DialogActions>
                <Button color="indigo" onClick={handleClose}>
                  Submit
                </Button>
                <Button color="green">Reset</Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Shadow>
    </>
  );
};

export const PendingCorporateInvoicesFrom = () => {
  return (
    <>
      <form>
        <div className="my-8 flex flex-col gap-5">
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Check In Id <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Cold Drink</Option>
                <Option>Momo</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Guest <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Sunil</Option>
                <Option>user</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Room Number <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Cold Drink</Option>
                <Option>Momo</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Room Type <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Cold Drink</Option>
                <Option>Momo</Option>
              </Select>
            </div>
          </div>

          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Number Of Adult <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input size="lg" className="py-3" />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">Number Of Child</h3>
            <div className="w-full">
              <Input size="lg" className="py-3" />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Rate <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Cold Drink</Option>
                <Option>Momo</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Room Tariff <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input size="lg" placeholder="#####.###" className="py-3" icon={<CiDollar size={25} />} />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Tax Amount <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input size="lg" className="py-3" icon={<CiDollar size={25} />} />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Total Amount <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input size="lg" className="py-3" icon={<CiDollar size={25} />} />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Stay Length <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input size="lg" className="py-3" />
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Check In Time <span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Input size="lg" type="datetime-local" className="py-3" />
            </div>
          </div>

          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Payment Status<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Paid</Option>
                <Option>UnPaid</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <h3 className="text-primary capitalize font-medium flex w-96">
              Status<span className="text-red-500 ml-2">*</span>
            </h3>
            <div className="w-full">
              <Select label="Select">
                <Option>Check In</Option>
                <Option>Check Out</Option>
              </Select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
