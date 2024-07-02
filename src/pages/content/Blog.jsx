/* eslint-disable react-hooks/exhaustive-deps */
import { Card, TablePagination } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../../components/component/modals/AddModal";
import { fetchProducts } from "../../redux/slices/productSlice";
import { Shadow } from "../../routers";
import EnhancedTable from "../../sections/content/Products/Table";
import { headCells } from "../../sections/content/Products/headCells";
import Form from "../../sections/entries/Products/Form";

// TODO: menu options alias
const alias = {
  Status: "status",
  Brand: "brand_id",
  "Product for?": "category_id",
};

export default function Products() {
  // TODO: hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [openAdd, setOpenAdd] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
  });
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState({});

  const [rows, setRows] = useState([]);

  // TODO: get the data from slice
  const products = useSelector((state) => state.product.products);

  const formattedFilters = Object.entries(selectedFilters).reduce(
    (acc, [key, { value }]) => {
      acc[alias[key]] = value;
      return acc;
    },
    {}
  );

  // TODO: fetch the products when searached
  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        dispatch(
          fetchProducts({
            enqueueSnackbar,
            limit: pagination.limit,
            page: pagination.page,
            filter: formattedFilters,
            search,
            tabFilter: activeTab,
          })
        );
      }, [2000]);
      return () => clearTimeout(debounce);
    } else {
      dispatch(
        fetchProducts({
          enqueueSnackbar,
          limit: pagination.limit,
          page: pagination.page,
          filter: formattedFilters,
          search,
          tabFilter: activeTab,
        })
      );
    }
  }, [
    dispatch,
    search,
    pagination.limit,
    pagination.page,
    activeTab,
    selectedFilters,
  ]);

  // TODO: set the rows

  useEffect(() => {
    const data = products?.data?.map((product) => ({
      id: product?.id,
      slug: product?.slug,
      name: product?.name,
      sku: product?.sku,
      photo: product?.photo,
      status: product?.status,
      new: product?.new,
      trending: product?.trending,
      featured: product?.featured,
      description: product?.description,
      gallery: product?.gallery,
      brand: product?.brand,
      category: product?.category,
      sub_category: product?.sub_category,
      sub_sub_category: product?.sub_sub_category,
      variations: product?.variations,
      createdDate: moment(product?.created_at)
        .format("Do MMMM, YYYY")
        .replace(/(\d+)(th|st|nd|rd)/, "$1$2"),
    }));
    setRows(data);
  }, [products]);

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

  // TODO: filter the data
  const handleFilter = () => {
    dispatch(
      fetchProducts({
        enqueueSnackbar,
        limit: pagination.limit,
        page: pagination.page,
        filter: formattedFilters,
        search,
      })
    );
  };

  // TODO: console.logs

  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showSearch={true}
            title="Blogs"
            headCells={headCells}
            rows={rows}
            showFilter={true}
            setOpenAdd={() => setOpenAdd((prev) => !prev)}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            setRefresh={setRefresh}
            refresh={refresh}
            search={search}
            setSearch={setSearch}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            handleFilter={handleFilter}
          />

          {/* TODO: pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products?.meta?.total}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Shadow>

      {/* TODO: add products */}
      <AddDialog
        maxWidth="lg"
        title={"Add new Blog"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
      >
        <Form
          handleClose={() => setOpenAdd(false)}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </AddDialog>
    </>
  );
}
