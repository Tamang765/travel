import { Card } from "@material-tailwind/react";
import React from "react";
import { Shadow } from "../../routers";
import EnhancedTable from "./UserTable";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "body",
    numeric: true,
    disablePadding: false,
    label: "Body",
  },
  {
    id: "purpose",
    numeric: true,
    disablePadding: false,
    label: "Purpose",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
];

const rows = [
  {
    title: "Lorem Ipsum 1",
    body: "Lorem ipsum dolor sit amet.",
    purpose: "Purpose 1",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 2",
    body: "Consectetur adipiscing elit.",
    purpose: "Purpose 2",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 3",
    body: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    purpose: "Purpose 3",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 4",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    purpose: "Purpose 4",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 5",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    purpose: "Purpose 5",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 6",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    purpose: "Purpose 6",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 7",
    body: "Nulla facilisi. Aenean nec eros.",
    purpose: "Purpose 7",
    date: new Date(),
  },
  {
    title: "Lorem Ipsum 8",
    body: "Integer vestibulum finibus tellus, eu volutpat ex pulvinar vel.",
    purpose: "Purpose 8",
    date: new Date(),
  },
];

export const Users = () => {
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable title="All Users" headCells={headCells} rows={rows} />
        </Card>
      </Shadow>
    </>
  );
};
