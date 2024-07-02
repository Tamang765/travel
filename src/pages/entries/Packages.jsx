import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchPackages } from "../../redux/slices/packageSlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Packages/Form";
import EnhancedTable from "../../sections/entries/Packages/Table";

const headCells = [
  {
    id: "page_id",
    numeric: false,
    disablePadding: false,
    label: "Page ID",
  },
  {
    id: "highlights",
    numeric: false,
    disablePadding: false,
    label: "Highlights",
  },
  {
    id: "overview",
    numeric: false,
    disablePadding: false,
    label: "Overview",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "route_map",
    numeric: false,
    disablePadding: false,
    label: "Route Map",
  },

  {
    id: "equipments",
    numeric: true,
    disablePadding: false,
    label: "Equipments",
  },
  {
    id: "inclusives",
    numeric: true,
    disablePadding: false,
    label: "Inclusives",
  },
  {
    id: "exclusives",
    numeric: true,
    disablePadding: false,
    label: "Exclusives",
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "Note",
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

export default function Packages() {
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [openAdd, setOpenAdd] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
  });
  const [refresh, setRefresh] = useState(false);

  const [rows, setRows] = useState([]);

  // TODO: get the data from slice
  const packages = useSelector((state) => state.packages.packages);
  // TODO: fetching the packages
  useEffect(() => {
    dispatch(fetchPackages({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination, refresh]);

  // TODO: set the rows

  useEffect(() => {
    const data = packages?.data?.data?.map((size) => ({
      id: size?.id,
      page_id: size?.page_id,
      highlights: size?.highlights,
      overview: size?.overview,
      locations: size?.locations,
      route_map: size?.route_map,
      equipments: size?.equipments,
      inclusives: size?.inclusives,
      exclusives: size?.exclusives,
      note: size?.note,

      createdDate: moment(size?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [packages]);

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
            title="Packages"
            headCells={headCells}
            rows={rows}
            showFilter={false}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            setRefresh={setRefresh}
            refresh={refresh}
          />

          {/* TODO: pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={packages?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add sizes */}
      <AddDialog
        maxWidth="sm"
        title={"Add new Packages"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
