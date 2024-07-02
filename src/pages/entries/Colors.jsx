import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchFaqs } from "../../redux/slices/faqSlice";
import { Shadow } from "../../routers";
import Form from "../../sections/entries/Colors/Form";
import EnhancedTable from "../../sections/entries/Colors/Table";

const headCells = [
  // {
  //   id: "name",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Name",
  // },

  {
    id: "question",
    numeric: false,
    disablePadding: false,
    label: "Question",
  },
  {
    id: "answer",
    numeric: false,
    disablePadding: false,
    label: "Answer",
  },
  {
    id: "package",
    numeric: false,
    disablePadding: false,
    label: "Package",
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
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  // TODO: get the data from slice
  const colors = useSelector((state) => state.color.colors);
  const faqs = useSelector((state) => state.faq.faqs);

  // TODO: fetching the colors
  // TODO: fetch the colors when searached
  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        dispatch(
          fetchFaqs({
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
        fetchFaqs({
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
    const data = faqs?.data?.map((faq) => ({
      id: faq?.id,
      answer: faq?.answer,
      question: faq?.question,
      package_id: faq?.package_id,
      createdDate: moment(faq?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [faqs]);

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
  console.log(faqs, "rows");

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            showSearch={true}
            title="Faq"
            headCells={headCells}
            rows={rows}
            showFilter={false}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            setRefresh={setRefresh}
            refresh={refresh}
            setSearch={setSearch}
            search={search}
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
        title={"Add new FAQ"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
