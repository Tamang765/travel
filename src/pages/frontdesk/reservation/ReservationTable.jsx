import React from "react";
import { Shadow } from "../../../routers";
import { Card } from "@material-tailwind/react";
import EnhancedTable from "../../../components/component/table/Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Check In",
  },
  {
    id: "checkout",
    numeric: true,
    disablePadding: false,
    label: "Check Out",
  },
  {
    id: "guesttype",
    numeric: true,
    disablePadding: false,
    label: "Guest Type",
  },
  {
    id: "rooms",
    numeric: true,
    disablePadding: false,
    label: "Number of Rooms",
  },
  {
    id: "adults",
    numeric: true,
    disablePadding: false,
    label: "Number of Adults",
  },
  {
    id: "child",
    numeric: true,
    disablePadding: false,
    label: "Number of Child",
  },
  {
    id: "user",
    numeric: true,
    disablePadding: false,
    label: "Add User",
  },
  {
    id: "confirm",
    numeric: true,
    disablePadding: false,
    label: "Confirm",
  },
  {
    id: "cancel",
    numeric: true,
    disablePadding: false,
    label: "Cancel",
  },
];

export const ReservationTable = () => {
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable title="All Reservation" headCells={headCells} />
        </Card>
      </Shadow>
    </>
  );
};
