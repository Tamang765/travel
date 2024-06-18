import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchColors } from "../../redux/slices/colorSlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Colors/Form";
import EnhancedTable from "../../sections/entries/Colors/Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },

  {
    id: "code",
    numeric: false,
    disablePadding: false,
    label: "Code",
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

export default function Colors() {
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [openAdd, setOpenAdd] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
  });
  const [rows, setRows] = useState([]);

  // TODO: get the data from slice
  const colors = useSelector((state) => state.color.colors);

  // TODO: fetching the colors
  useEffect(() => {
    dispatch(
      fetchColors({
        enqueueSnackbar,
        limit: pagination.limit,
        page: pagination.page,
      })
    );
  }, [dispatch, enqueueSnackbar, pagination.page, pagination.limit]);

  // TODO: set the rows

  useEffect(() => {
    const data = colors?.data?.map((color) => ({
      id: color?.id,
      slug: color?.slug,
      name: color?.name,
      code: color?.code,
      createdDate: moment(color?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [colors]);

  // TODO: functions
  const handleChangePage = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination((prev) => ({
      ...prev,
      page: 0,
      limit: parseInt(event.target.value, 10),
    }));
  };

  // TODO: console.logs
  console.log(rows, "rows");

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            showSearch={false}
            title="Colors"
            headCells={headCells}
            rows={rows}
            showFilter={false}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
          />

          {/* TODO: pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={colors?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add color */}
      <AddDialog
        maxWidth="sm"
        title={"Add new color"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
