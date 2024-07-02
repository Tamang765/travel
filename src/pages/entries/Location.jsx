import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchLocation } from "../../redux/slices/locationSlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Locations/Form";
import EnhancedTable from "../../sections/entries/Locations/Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },

  // {
  //   id: "photo",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Photo",
  // },

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

export default function Brands() {
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
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  // TODO: get the data from slice
  const locations = useSelector((state) => state.locations.location);

  // TODO: fetching the brands
  // TODO: fetch the colors when searached
  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        dispatch(
          fetchLocation({
            enqueueSnackbar,
            limit: pagination.limit,
            page: pagination.page,
            search,
          })
        );
      }, [2000]);
      return () => clearTimeout(debounce);
    } else {
      dispatch(
        fetchLocation({
          enqueueSnackbar,
          limit: pagination.limit,
          page: pagination.page,
          search,
        })
      );
    }
  }, [dispatch, search, pagination.limit, pagination.page, enqueueSnackbar]);

  // TODO: set the rows

  useEffect(() => {
    const data = locations?.data?.map((brand) => ({
      id: brand?.id,
      name: brand?.name,
      createdDate: moment(brand?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [locations]);

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
            title="Locations"
            headCells={headCells}
            rows={rows}
            showFilter={false}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            search={search}
            setSearch={setSearch}
            refresh={refresh}
            setRefresh={setRefresh}
          />

          {/* TODO: pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={locations?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add brands */}
      <AddDialog
        maxWidth="sm"
        title={"Add new location"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} title={"location"} />
      </AddDialog>
    </>
  );
}
