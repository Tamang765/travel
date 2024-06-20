import { Card } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../../../../redux/slices/categorySlice";
import EnhancedTable from "./Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "NAME",
  },

  {
    id: "photo",
    numeric: true,
    disablePadding: false,
    label: "Photo",
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
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 100,
  });
  const [rows, setRows] = useState([]);

  // TODO: get the data from slice
  const subCategories = useSelector((state) => state.category.subCategories);

  // TODO: fetching the categories
  useEffect(() => {
    dispatch(
      fetchSubCategories({
        enqueueSnackbar,
        ...pagination,
        parent_id,
      })
    );

    console.log(parent_id, "parent iddddddd");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: set the rows

  useEffect(() => {
    const data = subCategories?.data?.map((category) => ({
      id: category?.id,
      name: category?.name,
      slug: category?.slug,
      photo: category?.photo,
      createdDate: moment(category?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [subCategories]);

  // TODO: console.logs

  return (
    <div className="my-4">
      <Card color="transparent" shadow={false}>
        <EnhancedTable title="" headCells={headCells} rows={rows} />
      </Card>
    </div>
  );
}
