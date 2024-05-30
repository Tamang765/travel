import { Button, IconButton, Input } from "@material-tailwind/react";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Slide,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { forwardRef, useMemo, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlinePrinter,
} from "react-icons/ai";
import { MdFilterList, MdOutlineDeleteOutline } from "react-icons/md";
import { SearchAwaiting } from "../../../pages/frontdesk/awaiting/SearchAwaiting";
import { Shadow, TitleMd } from "../../../routers";
export const RoomTypeTable = () => {
  return (
    <>
      <Shadow>
        <EnhancedTable title="Rate Types" />
      </Shadow>
    </>
  );
};

function createData(name, rooms_rates) {
  return {
    name,
    rooms_rates,
  };
}
const rows = [
  createData("standar rate", "Room 101 -> $120.00"),
  createData("standar rate", "Triple -> $120.00"),
];

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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Rate Types",
  },
  {
    id: "rooms_rates",
    numeric: false,
    disablePadding: false,
    label: "Rooms and Rates",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, title } = props;

  //popup model
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Dynamic input field
  const [inputList, setInputList] = useState([
    { roomtype: "", pernight: "", chargeperadult: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { roomtype: "", pernight: "", chargeperadult: "" },
    ]);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <TitleMd> {title}</TitleMd>
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <div className="flex items-center gap-5">
            <IconButton variant="gradient" color="green">
              <AiOutlineEdit size={20} />
            </IconButton>
            <IconButton variant="gradient" color="red">
              <MdOutlineDeleteOutline size={20} />
            </IconButton>
            <IconButton variant="gradient">
              <AiOutlinePrinter size={20} />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-5">
            <SearchAwaiting />
            <button
              onClick={handleClickOpen}
              className="flex items-center bg-primary text-sm text-white p-2.5 px-6 rounded-lg"
            >
              <AiOutlinePlus size={18} className="mr-4" />
              Add
            </button>
            <Dialog
              maxWidth="lg"
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Add Rate Type</DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <div className="flex">
                    <h3 className="text-primary capitalize font-medium flex w-64">
                      Add Rate Type <span className="text-red-500 ml-2">*</span>
                    </h3>
                    <div className="w-full">
                      <Input type="number" size="lg" className="py-3" />
                      <span className="mt-5 text-sm block">
                        Eg : Standard rate , Corporate rate
                      </span>
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
              <Divider />
              <DialogContent>
                <h3 className="text-primary capitalize font-medium flex w-64">
                  Rooms and Rates
                  <span className="text-red-500 ml-2">*</span>
                </h3>
                <br />
                <div className="relative overflow-x-auto shadow-md sm:rounded">
                  <table className="w-full text-sm text-left">
                    <thead className="text-md text-primary capitalize bg-blue-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Room Type
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Rate Per Night
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Charge Per Extra Adult
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {inputList.map((input, i) => (
                      <tbody className="text-gray-500">
                        <tr className="bg-white border-b">
                          <th scope="row">
                            <input
                              className="px-6 py-3 outline-none font-normal w-full"
                              placeholder="Room Type"
                              name="roomtype"
                              value={input.roomtype}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </th>
                          <td>
                            <input
                              className="px-6 py-3 outline-none font-normal w-full"
                              placeholder="####.##"
                              name="pernight"
                              value={input.pernight}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td>
                            <input
                              className="px-6 py-3 outline-none font-normal w-full"
                              placeholder="####.##"
                              name="chargeperadult"
                              value={input.chargeperadult}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td className=" float-right mx-6 my-2">
                            {inputList.length !== 1 && (
                              <IconButton
                                className="bg-red-400"
                                onClick={() => handleRemoveClick(i)}
                              >
                                <AiOutlineClose size={18} />
                              </IconButton>
                            )}
                          </td>
                        </tr>
                        {inputList.length - 1 === i && (
                          <IconButton
                            className="bg-indigo-400 my-3 mx-2"
                            onClick={handleAddClick}
                          >
                            <AiOutlinePlus size={18} />
                          </IconButton>
                        )}
                      </tbody>
                    ))}
                  </table>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="indigo">
                  Add
                </Button>
                <Button onClick={handleClose} color="red">
                  Reset
                </Button>
              </DialogActions>
            </Dialog>
            <IconButton variant="outlined" color="gray">
              <MdFilterList size={20} />
            </IconButton>
          </div>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ title }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar title={title} numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.name)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      className="capitalize"
                      align="left"
                      id={labelId}
                      onClick={(event) => handleClick(event, row.name)}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      className="capitalize"
                      align="left"
                      id={labelId}
                      onClick={(event) => handleClick(event, row.name)}
                    >
                      {row.rooms_rates}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
