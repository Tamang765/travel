import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchFaqs } from "../../redux/slices/faqSlice";
import { Shadow } from "../../routers";
import FaqForm from "../../sections/supports/Faqs/FaqForm";
import EnhancedTable from "../../sections/supports/Faqs/FaqTable";

const headCells = [
  {
    id: "question",
    numeric: false,
    disablePadding: false,
    label: "Question",
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

export default function Faqs() {
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
  const faqs = useSelector((state) => state.faq.faqs);

  // TODO: fetching the emergeFaqs
  useEffect(() => {
    dispatch(fetchFaqs({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination]);

  // TODO: set the rows

  useEffect(() => {
    const data = faqs?.data?.map((faq) => ({
      id: faq?.id,
      question: faq?.question,
      answer: faq?.answer,
      user_type_id: faq?.user_type_id,
      order: faq?.order,
      is_published: faq?.is_published,
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

  console.log(rows, "rows");

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            showSearch={false}
            title="FAQs"
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
            count={faqs?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add faqs */}
      <AddDialog
        maxWidth="lg"
        title={"Add new FAQ"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <FaqForm handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
