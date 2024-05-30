import { Button } from "@material-tailwind/react";
import React from "react";
import { Shadow, TitleMd } from "../../routers";

export const CheckInHistory = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Check In History</TitleMd>

        <div className="h-[50vh] flex items-center justify-center flex-col">
          <TitleMd>No records match your specified criteria</TitleMd>

          <div className="flex gap-6 mt-8">
            <Button color="indigo">Add a record</Button>
            or
            <Button color="gray" variant="outlined">
              Import Data
            </Button>
          </div>
        </div>
      </Shadow>
    </>
  );
};
