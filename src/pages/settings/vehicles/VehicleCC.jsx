import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../../components/component/modals/AddModal";
import { fetchVehicleCCs } from "../../../redux/slices/vehicleSlice";
import { Shadow } from "../../../routers";
import Form from "../../../sections/settings/vehicles/vehicleCC/Form";
import EnhancedTable from "../../../sections/settings/vehicles/vehicleCC/Table";

const headCells = [
  {
    id: "cc",
    numeric: false,
    disablePadding: false,
    label: "CC",
  },

  {
    id: "remarks",
    numeric: true,
    disablePadding: false,
    label: "Remarks",
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
  const vehicleCCs = useSelector((state) => state.vehicle.vehicleCCs);

  // TODO: fetching the vehicleCC
  useEffect(() => {
    dispatch(fetchVehicleCCs({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination]);

  // TODO: set the rows

  useEffect(() => {
    const data = vehicleCCs?.data?.map((cc) => ({
      id: cc?.id,
      cc: cc?.cc,
      remarks: cc?.remarks,
      createdDate: moment(cc?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [vehicleCCs]);

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
            title="Vehicle CCs"
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
            count={vehicleCCs?.meta?.total}
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
        title={"Add new vehicle cc"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
