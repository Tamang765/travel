/* eslint-disable react-hooks/exhaustive-deps */
import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchVehicles } from "../../redux/slices/vehicleSlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Vehicle/Form";
import EnhancedTable from "../../sections/entries/Vehicle/Table";
import { headCells } from "../../sections/entries/Vehicle/headCells";

// TODO: menu options alias
const alias = {
  Status: "status",
  Brand: "brand_id",
  "Vehicle for?": "category_id",
};

export default function Vehicles() {
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [openAdd, setOpenAdd] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
  });
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState({});

  const [rows, setRows] = useState([]);

  // TODO: get the data from slice
  const vehicles = useSelector((state) => state.vehicle.vehicles);

  const formattedFilters = Object.entries(selectedFilters).reduce(
    (acc, [key, { value }]) => {
      acc[alias[key]] = value;
      return acc;
    },
    {}
  );

  // TODO: fetch the vehicles when searached
  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        dispatch(
          fetchVehicles({
            enqueueSnackbar,
            limit: pagination.limit,
            page: pagination.page,
            filter: formattedFilters,
            search,
            tabFilter: activeTab,
          })
        );
      }, [2000]);
      return () => clearTimeout(debounce);
    } else {
      dispatch(
        fetchVehicles({
          enqueueSnackbar,
          limit: pagination.limit,
          page: pagination.page,
          filter: formattedFilters,
          search,
          tabFilter: activeTab,
        })
      );
    }
  }, [
    dispatch,
    search,
    pagination.limit,
    pagination.page,
    activeTab,
    selectedFilters,
  ]);

  // TODO: set the rows

  useEffect(() => {
    const data = vehicles?.data?.map((vehicle) => ({
      id: vehicle?.id,
      slug: vehicle?.slug,
      name: vehicle?.name,
      type: vehicle?.type,
      image: vehicle?.image,
      capacity: vehicle?.capacity,
      price: vehicle?.price,
      description: vehicle?.description,

      createdDate: moment(vehicle?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [vehicles]);

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

  // TODO: filter the data
  const handleFilter = () => {
    dispatch(
      fetchVehicles({
        enqueueSnackbar,
        limit: pagination.limit,
        page: pagination.page,
        filter: formattedFilters,
        search,
      })
    );
  };

  // TODO: console.logs

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showSearch={true}
            title="Vehicles"
            headCells={headCells}
            rows={rows}
            showFilter={true}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            setRefresh={setRefresh}
            refresh={refresh}
            search={search}
            setSearch={setSearch}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            handleFilter={handleFilter}
          />

          {/* TODO: pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={vehicles?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add vehicles */}
      <AddDialog
        maxWidth="lg"
        title={"Add new vehicle"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form
          handleClose={() => setOpenAdd(false)}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </AddDialog>
    </>
  );
}
