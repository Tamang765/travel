import { Card } from "@material-tailwind/react";
import React from "react";
import { Shadow } from "../../../routers";
import EnhancedTable from "./TodayRideTable";

const headCells = [
  {
    id: "rideId",
    numeric: false,
    disablePadding: false,
    label: "Ride ID",
  },

  {
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Customer Name",
  },

  {
    id: "pickup",
    numeric: true,
    disablePadding: false,
    label: "Pick Up",
  },

  {
    id: "dropoff",
    numeric: true,
    disablePadding: false,
    label: "Drop Off",
  },

  {
    id: "rider",
    numeric: true,
    disablePadding: false,
    label: "Rider Name",
  },

  {
    id: "vehicle",
    numeric: true,
    disablePadding: false,
    label: "Vehicle",
  },

  {
    id: "vehicleNumber",
    numeric: true,
    disablePadding: false,
    label: "Vehicle Number",
  },

  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },

  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Trip Start At",
  },

  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Trip Duration",
  },
];

const rows = [
  {
    rideId: "001",
    customer: "John Doe",
    riderId: "R001",
    rider: "Alice Smith",
    vehicle: "Car",
    vehicleNumber: "ABC123",
    time: "2022-01-30T10:00:00", // Assuming a date-time format, adjust as needed
    duration: "1 hour 30 minutes",
    status: "Ongoing",
    pickup: "Lele",
    dropoff: "Lele",
  },
  {
    rideId: "002",
    customer: "Jane Smith",
    riderId: "R002",
    rider: "Bob Johnson",
    vehicle: "Bike",
    vehicleNumber: "XYZ789",
    time: "2022-02-15T15:30:00", // Adjust the date-time format as needed
    duration: "45 minutes",
    status: "Ongoing",
    pickup: "Lele",
    dropoff: "Lele",
  },
  {
    rideId: "003",
    customer: "Alice Brown",
    riderId: "R003",
    rider: "Charlie White",
    vehicle: "Scooter",
    vehicleNumber: "DEF456",
    time: "2022-03-10T12:45:00",
    duration: "1 hour",
    status: "Completed",
    pickup: "Lele",
    dropoff: "Lele",
  },

  {
    rideId: "003",
    customer: "Alice Brown",
    riderId: "R003",
    rider: "Charlie White",
    vehicle: "Scooter",
    vehicleNumber: "DEF456",
    time: "2022-03-10T12:45:00",
    duration: "1 hour",
    status: "Ongoing",
    pickup: "Lele",
    dropoff: "Lele",
  },

  {
    rideId: "003",
    customer: "Alice Brown",
    riderId: "R003",
    rider: "Charlie White",
    vehicle: "Scooter",
    vehicleNumber: "DEF456",
    time: "2022-03-10T12:45:00",
    duration: "1 hour",
    status: "Completed",
    pickup: "Lele",
    dropoff: "Lele",
  },

  {
    rideId: "003",
    customer: "Alice Brown",
    riderId: "R003",
    rider: "Charlie White",
    vehicle: "Scooter",
    vehicleNumber: "DEF456",
    time: "2022-03-10T12:45:00",
    duration: "1 hour",
    status: "Ongoing",
    pickup: "Lele",
    dropoff: "Lele",
  },
];

export default function TodayRides() {
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            title="Today Rides"
            headCells={headCells}
            rows={rows}
            showAdd={false}
          />
        </Card>
      </Shadow>
    </>
  );
};
