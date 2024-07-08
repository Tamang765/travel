import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { DateRangeIcon } from "@mui/x-date-pickers";
import { format } from "date-fns";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Controller, useFormContext } from "react-hook-form";
import { IoClose } from "react-icons/io5";

export const CustomDateRange = ({ name }) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (dateRanges) => {
    setDate(dateRanges.selection);
  };

  function handleOnClick() {
    setOpen(!open);
  }

  return (
    <>
      <div
        className="flex w-[16.5rem] px-2 items-center justify-between border-2 py-1.5 text-gray-500 rounded-md border-gray-300 cursor-pointer"
        onClick={handleOnClick}
      >
        {date ? (
          <span className=" text-black">
            {format(date.startDate, "MMM dd, yyyy")} -{" "}
            {format(date.endDate, "MMM dd, yyyy")}
          </span>
        ) : (
          "Select Date Range"
        )}
        <div>
          <DateRangeIcon />
        </div>
      </div>

      {open && (
        <Dialog open={open}>
          <DialogTitle className="flex justify-between items-center">
            <div className="font-bold">Select Date Range</div>
            <IconButton color="error">
              <IoClose size={24} onClick={handleOnClick} />
            </IconButton>
          </DialogTitle>
          <div className="px-5">
            <Controller
              name={name}
              control={control}
              defaultValue={date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateRangePicker
                  rangeColors={["#189AB4"]}
                  ranges={[value || date]}
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e.selection); // Update the value in the form context
                  }}
                  minDate={new Date()}
                />
              )}
            />
          </div>
          <DialogActions>
            <div className="flex gap-2 pb-2 pr-5">
              <div
                className="flex items-center border-2 border-red-500 px-8 py-1 text-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                onClick={handleOnClick}
              >
                Cancel
              </div>
              <div
                className="flex items-center bg-yellow-500 px-8 py-1 text-white rounded-md cursor-pointer hover:bg-yellow-600 transition-all"
                onClick={handleOnClick}
              >
                Select
              </div>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
