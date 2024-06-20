/* eslint-disable react-hooks/exhaustive-deps */
import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import {
  fetchCategories,
  fetchFilteredCategories,
  fetchMainCategories,
} from "../../redux/slices/categorySlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Categories/Form";
import EnhancedTable from "../../sections/entries/Categories/Table";

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

export default function Categories() {
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [openAdd, setOpenAdd] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10000,
  });
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // TODO: get the data from slice
  const categories = useSelector((state) => state.category.categories);
  const filteredCategories = useSelector(
    (state) => state.category.filteredCategories
  );

  // TODO: fetching the categories
  useEffect(() => {
    if (activeTab === "all") {
      dispatch(
        fetchCategories({
          enqueueSnackbar,
          ...pagination,
          search,
        })
      );
    } else {
      dispatch(
        fetchFilteredCategories({
          enqueueSnackbar,
          ...pagination,
          search,
          parent_id: activeTab,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, dispatch, enqueueSnackbar, pagination, refresh]);

  useEffect(() => {
    dispatch(fetchMainCategories({ enqueueSnackbar }));
  }, []);

  // TODO: set the rows

  useEffect(() => {
    const data = (
      activeTab === "all" ? categories : filteredCategories
    )?.data?.map((category) => ({
      id: category?.id,
      name: category?.name,
      slug: category?.slug,
      photo: category?.photo,
      createdDate: moment(category?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [activeTab, categories, filteredCategories]);

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

  console.log(activeTab, "active aab");

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            showSearch={false}
            title="Categories"
            headCells={headCells}
            rows={rows}
            showFilter={false}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            refresh={refresh}
            setRefresh={setRefresh}
            search={search}
            setSearch={setSearch}
          />

          {/* TODO: pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              activeTab === "all"
                ? categories?.meta?.total
                : filteredCategories?.meta?.total
            }
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add category */}
      <AddDialog
        maxWidth="sm"
        title={"Add new category"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        {/* TODO: active tab is sent, when new category is created, it slide the tabs to newly added. */}
        <Form
          handleClose={() => setOpenAdd(false)}
          setActiveTab={setActiveTab}
        />
      </AddDialog>
    </>
  );
}
