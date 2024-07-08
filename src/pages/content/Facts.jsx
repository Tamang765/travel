/* eslint-disable react-hooks/exhaustive-deps */
import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchFacts } from "../../redux/slices/factSlice";
import { Shadow } from "../../routers";
import EnhancedTable from "../../sections/content/Facts/Table";
import { headCells } from "../../sections/content/Facts/headCells";
import Form from "../../sections/entries/Facts/Form";

// TODO: menu options alias
const alias = {
  Status: "status",
  Brand: "brand_id",
  "Product for?": "category_id",
};

export default function Products() {
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
  const facts = useSelector((state) => state.fact.facts);

  const formattedFilters = Object.entries(selectedFilters).reduce(
    (acc, [key, { value }]) => {
      acc[alias[key]] = value;
      return acc;
    },
    {}
  );

  // TODO: fetch the products when searached
  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        dispatch(
          fetchFacts({
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
        fetchFacts({
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
  console.log(facts);

  useEffect(() => {
    const data = facts?.data?.map((fact) => ({
      id: fact?.id,
      package_id: fact?.package_id,
      start_end_point: fact?.start_end_point,
      activity: fact?.activity,
      accomodation: fact?.accomodation,

      altitude: fact?.altitude,
      best_season: fact?.best_season,
      country: fact?.country,
      duration: fact?.duration,
      difficulty: fact?.difficulty,
      category_id: fact?.category_id,
      meals: fact?.meals,

      createdDate: moment(fact?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [facts]);

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
      facts({
        enqueueSnackbar,
        limit: pagination.limit,
        page: pagination.page,
        filter: formattedFilters,
        search,
      })
    );
  };
  // TODO: console.logs
  console.log(facts);
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            title="Facts"
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
            count={facts?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add products */}
      <AddDialog
        maxWidth="lg"
        title={"Add new Fact"}
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
