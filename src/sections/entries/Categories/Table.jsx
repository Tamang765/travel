import { Button } from "@material-tailwind/react";
import { Collapse, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog } from "../../../components/component/modals/ConfirmDialog";
import { EditDialog } from "../../../components/component/modals/EditModal";
import Iconify from "../../../components/iconify";
import TableNoData from "../../../components/table/TableNoData";
import TableSkeleton from "../../../components/table/TableSkeleton";
import { useTheme } from "../../../providers/ThemeProvider";
import { deleteCategory } from "../../../redux/slices/categorySlice";
import Form from "./Form";
import SubCategories from "./SubCategories/SubCategories";
import { EnhancedTableHead } from "./TableHeads";
import { EnhancedTableToolbar } from "./TableToolbar";

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
  activeTab,
  setActiveTab,
  refresh,
  setRefresh,
  setSearch,
  search,
}) {
  console.log(rows, "row");
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { colors } = useTheme();

  // TODO: useStates
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);

  const [open, setOpen] = useState(false);
  const [activeRow, setActiveRow] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [dataToEdit, setDataToEdit] = useState();
  const [tabData, setTabData] = useState([]);

  // ======

  // TODO: get the data from slice

  const deleteLoading = useSelector((state) => state.category.isLoading);
  const fetchLoading = useSelector((state) => state.category.fetchLoading);
  const mainCategories = useSelector((state) => state.category.mainCategories);

  // TODO:================

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const visibleRows = React.useMemo(() => rows, [rows]);

  // TODO: useEffects
  React.useEffect(() => {
    const data = mainCategories?.map((category) => ({
      label: category?.name,
      value: category?.id,
    }));

    setTabData(data);
  }, [mainCategories]);

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

  const handleOpenCategories = (id) => {
    setOpen((prev) => (id === activeRow ? !open : true));
    setActiveRow(id);
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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          refresh={refresh}
          setRefresh={setRefresh}
          setSearch={setSearch}
          search={search}
        />

        {/* TODO: tabs */}
        <div className="flex border-b border-gray-200 overflow-scroll">
          {tabData.map((tab) => (
            <button
              key={tab.value}
              className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 w-fit ${
                activeTab === tab.value
                  ? "border-black text-black border-b-4"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              headCells={headCells}
            />
            <TableBody>
              {(fetchLoading
                ? [...Array(5)]
                : visibleRows?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
              )?.map((row, index) => {
                const isItemSelected = isSelected(row?.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <>
                    {row ? (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          // key={row.name}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <IconButton
                              size="small"
                              color={open ? "inherit" : "default"}
                              onClick={() => handleOpenCategories(row?.id)}
                            >
                              <Iconify
                                icon={
                                  open && activeRow === row.id
                                    ? "eva:arrow-ios-upward-fill"
                                    : "eva:arrow-ios-downward-fill"
                                }
                              />
                            </IconButton>
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

                        <TableRow>
                          <TableCell sx={{ py: 0 }} colSpan={12}>
                            <Collapse
                              in={open && activeRow === row.id}
                              unmountOnExit
                            >
                              <SubCategories parent_id={row?.id} />
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableSkeleton key={index} />
                    )}
                  </>
                );
              })}

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
        title={`Edit category (${dataToEdit?.name})`}
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
        title={`Are you sure, you want to delete category (${dataToEdit?.name})?`}
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
