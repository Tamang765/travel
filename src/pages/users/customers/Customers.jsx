import { Card, TablePagination } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../../components/component/modals/AddModal";
import { fetchTeamMembers } from "../../../redux/slices/teamSlice";
import { Shadow } from "../../../routers";
import EnhancedTable from "../../../sections/teams/AdminTable";
import TeamForm from "../../../sections/teams/TeamForm";
import { headCells } from "../../../sections/teams/headCells";

export default function Customers() {
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

  // TODO: get the data from slice
  const teams = useSelector((state) => state.team.teams);

  // TODO: fetching the customers
  useEffect(() => {
    dispatch(fetchTeamMembers({ enqueueSnackbar, ...pagination }));
  }, [dispatch, enqueueSnackbar, pagination, refresh]);

  // TODO: set the rows

  useEffect(() => {
    const data = teams?.data?.map((team) => ({
      id: team?.id,
      name: team?.name,
      phone: team?.phone,
      role: team?.user_type?.title,
      email: team?.email,
      joinedDate: team?.created_at,
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

  console.log(teams, "teams");

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            showSearch={true}
            title="Customers"
            headCells={headCells}
            rows={rows}
            showFilter={true}
            showAdd={false}
            // setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            setRefresh={setRefresh}
            refresh={refresh}
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
