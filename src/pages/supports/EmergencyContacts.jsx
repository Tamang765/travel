import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchEmergencyContacts } from "../../redux/slices/emergencyContactSlice";
import { Shadow } from "../../routers";
import EmergencyContactForm from "../../sections/supports/EmergencyContacts/EmergencyContactForm";
import EnhancedTable from "../../sections/supports/EmergencyContacts/EmergencyContactTable";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },

  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
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

export default function EmergencyContacts() {
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
  const emergencyContacts = useSelector(
    (state) => state.emergencyContact.emergencyContacts
  );

  // TODO: fetching the emergeEmergencyContacts
  useEffect(() => {
    dispatch(fetchEmergencyContacts({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination]);

  // TODO: set the rows

  useEffect(() => {
    const data = emergencyContacts?.data?.map((contact) => ({
      id: contact?.id,
      name: contact?.contact_person_name,
      phone: contact?.contact_person_phone,
      createdDate: moment(contact?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [emergencyContacts]);

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
            title="Emergency contacts"
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
            count={emergencyContacts?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add emergencyContacts */}
      <AddDialog
        maxWidth="sm"
        title={"Add new emergency contact"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <EmergencyContactForm handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
