import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { EditDialog } from "../../components/component/modals/EditModal";
import TableNoData from "../../components/table/TableNoData";
import TableSkeleton from "../../components/table/TableSkeleton";
import { useTheme } from "../../providers/ThemeProvider";
import { EnhancedTableHead } from "./CustomerHeads";
import { EnhancedTableToolbar } from "./TableToolbar";
import TeamForm from "./TeamForm";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable({
  title,
  showFilter = true,
  showSearch = true,
  showAdd = true,
  showPrint = false,
  headCells,
  rows,
  page,
  rowsPerPage,
  setOpenAdd,
  setRefresh,
  refresh,
}) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [openConfirmDialoug, setOpenConfirmDialoug] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [dataToEdit, setDataToEdit] = useState();

  // TODO: get the data from slice

  const fetchLoading = useSelector((state) => state.team.fetchLoading);
  const deleteLoading = useSelector((state) => state.team.isLoading);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),

    [order, orderBy, page, rows, rowsPerPage]
  );

  // TODO: functions
  // const handleDeleteUser = () => {
  //   dispatch(
  //     deleteTeamMembers({
  //       enqueueSnackbar,
  //       handleClose: () => setOpenConfirmDialoug(false),
  //       userId: dataToEdit?.id,
  //     })
  //   );
  // };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          showAdd={showAdd}
          showSearch={showSearch}
          showFilter={showFilter}
          showPrint={showPrint}
          setOpenAdd={setOpenAdd}
          limit={rowsPerPage}
          page={page}
          setRefresh={setRefresh}
          refresh={refresh}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {(fetchLoading ? [...Array(5)] : visibleRows)?.map(
                (row, index) => {
                  const isItemSelected = isSelected(row?.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      {row ? (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          // key={row.name}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                            padding="checkbox"
                          >
                            <Checkbox
                              style={{
                                color: colors.text,
                              }}
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row.id)}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                            id={labelId}
                            onClick={(event) => handleClick(event, row.id)}
                          >
                            <span
                              style={{
                                color: colors.text,
                              }}
                            >
                              {row.name}
                            </span>
                          </TableCell>
                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                            onClick={(event) => handleClick(event, row.role)}
                          >
                            <span
                              style={{
                                color: colors.text,
                              }}
                            >
                              {row.role}
                            </span>
                          </TableCell>
                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                            onClick={(event) => handleClick(event, row.contact)}
                          >
                            <span
                              style={{
                                color: colors.text,
                              }}
                            >
                              {row.email}
                            </span>
                          </TableCell>

                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                            onClick={(event) => handleClick(event, row.address)}
                          >
                            <span
                              style={{
                                color: colors.text,
                              }}
                            >
                              {row.phone}
                            </span>
                          </TableCell>

                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                            onClick={(event) => handleClick(event, row.date)}
                          >
                            <span
                              style={{
                                color: colors.text,
                              }}
                            >
                              {moment(row?.joinedDate)
                                .format("Do MMMM, YYYY")
                                .replace(/(\d+)(th|st|nd|rd)/, "$1$2")}
                            </span>
                          </TableCell>

                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                          >
                            <Stack flexDirection={"row"} gap={2}>
                              <button
                                onClick={() => {
                                  setOpenEditModal(true);
                                  setDataToEdit(row);
                                }}
                                className="flex items-center bg-secondary text-sm text-white p-2 rounded-lg"
                              >
                                <AiOutlineEdit size={20} />
                              </button>
                              {/* <Button
                                onClick={() => {
                                  setOpenConfirmDialoug(true);
                                  setDataToEdit(row);
                                }}
                                className="flex items-center bg-red text-sm text-white p-2 rounded-lg"
                              >
                                <MdOutlineDeleteOutline size={20} />
                              </Button> */}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableSkeleton key={index} />
                      )}
                    </>
                  );
                }
              )}

              {!fetchLoading && (
                <TableNoData isNotFound={visibleRows?.length === 0} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* TODO: edit modal */}
      <EditDialog
        open={openEditModal}
        title={`Edit role (${dataToEdit?.name})`}
        handleClose={() => setOpenEditModal(false)}
        maxWidth="lg"
      >
        <TeamForm
          data={dataToEdit}
          isEdit={true}
          handleClose={() => setOpenEditModal(false)}
        />
      </EditDialog>

      {/* TODO: delete confirm dialoug */}

      {/* <ConfirmDialog
        open={openConfirmDialoug}
        loading={deleteLoading}
        disabled={deleteLoading}
        action={
          <Button
            loading={deleteLoading}
            disabled={deleteLoading}
            onClick={handleDeleteUser}
            variant="contained"
            className="!bg-primary"
          >
            Confirm
          </Button>
        }
        handleClose={() => setOpenConfirmDialoug(false)}
        title={`Are you sure, you want to delete the user(${dataToEdit?.name})?`}
      /> */}
    </>
  );
}
