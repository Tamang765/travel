import React from "react";
import { Shadow } from "../../../routers";
import UpcomingTableComponent from "./UpcomingTableComponent";

export const UpcomingMaintenance = () => {
  return (
    <>
      <Shadow>
        <div className="capitalize">
          <UpcomingTableComponent title="Upcoming Maintenance" />
        </div>
      </Shadow>
    </>
  );
};
