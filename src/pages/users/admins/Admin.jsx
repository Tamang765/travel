import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../../components/component/modals/AddModal";
import { fetchTeamMembers } from "../../../redux/slices/teamSlice";
import { Shadow } from "../../../routers";
import EnhancedTable from "../../../sections/teams/AdminTable";
import TeamForm from "../../../sections/teams/TeamForm";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },

  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
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
    label: "Joined Date",
  },

  {
    id: "action",
    disablePadding: false,
    label: "Action",
  },
];

export default function Admins() {
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
  const teams = useSelector((state) => state.team.teams);

  // TODO: fetching the admins
  useEffect(() => {
    dispatch(fetchTeamMembers({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination]);

  // TODO: set the rows

  useEffect(() => {
    const data = teams?.data?.map((team) => ({
      id: team?.id,
      name: team?.name,
      phone: team?.phone,
      role: team?.user_type?.title,
      email: team?.email,
      joinedDate: moment(team?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [teams]);

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
            title="Admins"
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
            count={teams?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add user */}
      <AddDialog
        title={"Add new user"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <TeamForm handleClose={() => setOpenAdd(false)} />
      </AddDialog>
    </>
  );
}
