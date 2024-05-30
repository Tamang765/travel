import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../../components/component/modals/AddModal";
import { fetchVehicleColors } from "../../../redux/slices/vehicleSlice";
import { Shadow } from "../../../routers";
import Form from "../../../sections/settings/vehicles/vehicleColors/Form";
import EnhancedTable from "../../../sections/settings/vehicles/vehicleColors/Table";

const headCells = [
  {
    id: "color",
    numeric: false,
    disablePadding: false,
    label: "Color",
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

export default function VehicleCC() {
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
  const vehicleColors = useSelector((state) => state.vehicle.vehicleColors);

  // TODO: fetching the vehicleColors
  useEffect(() => {
    dispatch(fetchVehicleColors({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination]);

  // TODO: set the rows

  useEffect(() => {
    const data = vehicleColors?.data?.map((color) => ({
      id: color?.id,
      color: color?.name,
      createdDate: moment(color?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [vehicleColors]);

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

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            showSearch={false}
            title="Vehicle Colors"
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
            count={vehicleColors?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add roles */}
      <AddDialog
        maxWidth="sm"
        title={"Add new vehicle color"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
