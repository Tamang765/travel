import { Button } from "@material-tailwind/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Shadow, TitleMd } from "../../routers";

export const CheckIn = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Check In</TitleMd>
        <form className="mt-8 mb-2">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex">
                <h3 className="text-primary capitalize font-medium flex w-64">
                  Check In <span className="text-red-500 ml-2">*</span>
                </h3>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Check In"
                      slotProps={{
                        textField: { fullWidth: true, size: "medium" },
                      }}
                    />
                  </LocalizationProvider>
                  <span className="text-sm text-red-300 my-2 block">
                    Check In date must be today
                  </span>
                </div>
              </div>
              <div className="flex mt-8">
                <h3 className="text-primary capitalize font-medium flex w-64">
                  Check Out <span className="text-red-500 ml-2">*</span>
                </h3>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Check Out"
                      slotProps={{
                        textField: { fullWidth: true, size: "medium" },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div>
              <p className="text-primary">
                4 rooms available for direct check in
              </p>
            </div>
          </div>
          <div className="flex gap-6 mt-8">
            <Button color="indigo">Check In</Button>
            <Button color="green">reset</Button>
          </div>
        </form>
      </Shadow>
    </>
  );
};
