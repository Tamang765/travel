import { Card } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EnhancedTable from "./Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "NAME",
  },



  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Created Date",
  },

  {
    id: "action",
    disablePadding: false,
    label: "Action",
  },
];

export default function SubCategories({ parent_id }) {
  const [rows, setRows] = useState([]);

  // TODO: get the data from slice
  const categories = useSelector((state) => state.category.categories);

  // TODO: set the rows

  useEffect(() => {
    const data = categories?.data
      ?.filter((cat) => cat?.parent_id === parent_id)
      ?.map((category) => ({
        id: category?.id,
        name: category?.name,
        slug: category?.slug,
        photo: category?.photo,
        createdDate: moment(category?.created_at)
          .format("Do MMMM, YYYY")
          .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
      }));
    setRows(data);
  }, [categories?.data, parent_id]);

  // TODO: console.logs

  return (
    <div className="my-4">
      <Card color="transparent" shadow={false}>
        <EnhancedTable title="" headCells={headCells} rows={rows} />
      </Card>
    </div>
  );
}
