import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchPages } from "../../redux/slices/pageSlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Sizes/Form";
import EnhancedTable from "../../sections/entries/Sizes/Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "meta_title",
    numeric: false,
    disablePadding: false,
    label: "Meta Title",
  },
  {
    id: "meta_description",
    numeric: false,
    disablePadding: false,
    label: "Meta Description",
  },
  {
    id: "meta_keywords",
    numeric: false,
    disablePadding: false,
    label: "Meta Keywords",
  },

  {
    id: "slug",
    numeric: true,
    disablePadding: false,
    label: "Slug",
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

export default function Sizes() {
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
  const pages = useSelector((state) => state.page.pages);
  // TODO: fetching the pages
  useEffect(() => {
    dispatch(fetchPages({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination, refresh]);

  // TODO: set the rows

  useEffect(() => {
    const data = pages?.data?.data?.map((size) => ({
      id: size?.id,
      slug: size?.slug,
      name: size?.name,
      title: size?.title,
      meta_title: size?.meta_title,
      meta_description: size?.meta_description,
      meta_keywords: size?.meta_keywords,

      createdDate: moment(size?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [pages]);

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
            title="Pages"
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
            count={pages?.meta?.total}
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
        title={"Add new Page"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
