import { Button } from "@material-tailwind/react";
import { Stack, styled, Tooltip, tooltipClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useSnackbar } from "notistack";
import * as React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog } from "../../../components/component/modals/ConfirmDialog";
import { EditDialog } from "../../../components/component/modals/EditModal";
import TableNoData from "../../../components/table/TableNoData";
import TableSkeleton from "../../../components/table/TableSkeleton";
import { useTheme } from "../../../providers/ThemeProvider";
import { deleteCategory } from "../../../redux/slices/categorySlice";
import Form from "./Form";
import { EnhancedTableHead } from "./TableHeads";
import { EnhancedTableToolbar } from "./TableToolbar";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

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
}) {
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { colors } = useTheme();

  // TODO: useStates
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);

  const [dataToEdit, setDataToEdit] = React.useState();

  // ======

  // TODO: get the data from slice

  const deleteLoading = useSelector((state) => state.category.isLoading);
  const fetchLoading = useSelector((state) => state.category.fetchLoading);

  // TODO:================

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),

  //   [order, orderBy, page, rowsPerPage, rows]
  // );

  // const visibleRows = React.useMemo(
  //   () => rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),

  //   [page, rowsPerPage, rows]
  // );

  const visibleRows = React.useMemo(() => rows, [rows]);

  // TODO: functions

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
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

  // TODO: delete the category
  const handleDelete = () => {
    dispatch(
      deleteCategory({
        id: dataToEdit?.id,
        enqueueSnackbar,
        handleClose: () => setOpenConfirmModal(false),
      })
    );
  };

  // ============

  console.log("rows", rows);

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
                  const isItemSelected = isSelected(row?.name);
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
                              onClick={(event) => handleClick(event, row.name)}
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
                            id={labelId}
                          >
                            <img
                              src={row?.photo}
                              alt={row?.photo}
                              className="w-20 h-20 object-contain"
                            />
                          </TableCell>

                          <TableCell
                            style={{
                              color: colors.text,
                            }}
                          >
                            <span>{row?.createdDate}</span>
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
                              <button
                                onClick={() => {
                                  setOpenConfirmModal(true);
                                  setDataToEdit(row);
                                }}
                                className="flex items-center bg-red text-sm text-white p-2 rounded-lg"
                              >
                                <MdOutlineDeleteOutline size={20} />
                              </button>
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

      {/* TODO: edit role modal */}
      <EditDialog
        open={openEditModal}
        title={`Edit cc ${dataToEdit?.cc}`}
        handleClose={() => setOpenEditModal(false)}
        maxWidth="sm"
      >
        <Form
          data={dataToEdit}
          isEdit={true}
          handleClose={() => setOpenEditModal(false)}
        />
      </EditDialog>

      {/* TODO: delete role confirm modal */}
      <ConfirmDialog
        handleClose={() => setOpenConfirmModal(false)}
        open={openConfirmModal}
        title={`Are you sure, you want to delete cc(${dataToEdit?.cc})?`}
        action={
          <Button
            loading={deleteLoading}
            disabled={deleteLoading}
            className="bg-primary"
            onClick={handleDelete}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
