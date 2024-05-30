import React from "react";
import { Shadow } from "../../../routers";
import EnhancedTable from "./Table";

export const DirtyRoom = () => {
  return (
    <>
      <Shadow>
        <EnhancedTable title="Dirty Rooms" />
      </Shadow>
    </>
  );
};
