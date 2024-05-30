import React from "react";
import { Card } from "@material-tailwind/react";
import { Shadow } from "../../../routers";
import EnhancedTable from "./RiderTable";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },

  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },

  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },

  {
    id: "active",
    numeric: true,
    disablePadding: false,
    label: "Active",
  },

  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },

  {
    id: "tripCount",
    numeric: true,
    disablePadding: false,
    label: "Trips Count",
  },

  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Joined Date",
  },
];

const rows = [
  {
    name: "John Doe",
    role: "Developer",
    email: "john.doe@example.com",
    address: "123 Main St, Cityville",
    date: "2022-01-30",
    active: true,
    phone: "555-1234",
    tripCount: 10,
  },
  {
    name: "Jane Smith",
    role: "Designer",
    email: "jane.smith@example.com",
    address: "456 Oak St, Townsville",
    date: "2022-02-15",
    active: false,
    phone: "555-5678",
    tripCount: 15,
  },
  {
    name: "Bob Johnson",
    role: "Manager",
    email: "bob.johnson@example.com",
    address: "789 Pine St, Villagetown",
    date: "2022-03-10",
    active: true,
    phone: "555-9876",
    tripCount: 8,
  },
  {
    name: "Alice Brown",
    role: "Marketing",
    email: "alice.brown@example.com",
    address: "101 Cedar St, Hamletville",
    date: "2022-04-05",
    active: false,
    phone: "555-4321",
    tripCount: 20,
  },
  {
    name: "Charlie White",
    role: "Analyst",
    email: "charlie.white@example.com",
    address: "202 Elm St, Suburbia",
    date: "2022-05-20",
    active: true,
    phone: "555-8765",
    tripCount: 12,
  },
];

const Riders = ({ title }) => {
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable title={title} headCells={headCells} rows={rows} />
        </Card>
      </Shadow>
    </>
  );
};

export default Riders
