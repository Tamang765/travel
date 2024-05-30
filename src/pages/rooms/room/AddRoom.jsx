import { Divider } from "@mui/material";
import React from "react";
import { Shadow, TitleMd } from "../../../routers";
import { RoomForm } from "./RoomForm";

export const AddRoom = () => {
  return (
    <>
      <div className=" max-w-3xl">
        <Shadow>
          <TitleMd>Add Room</TitleMd>
          <RoomForm />
        </Shadow>
      </div>
    </>
  );
};
