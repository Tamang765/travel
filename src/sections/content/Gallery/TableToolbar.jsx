/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-tailwind/react";
import {
  alpha,
  Box,
  Chip,
  Divider,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  MdFilterList,
  MdOutlineDeleteOutline,
  MdOutlineRefresh,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { TitleMd, TitleSm } from "../../../routers";

export function EnhancedTableToolbar({
  numSelected,
  title,
  showAdd,
  showSearch,
  showFilter,
  showPrint,
  setOpenAdd,
  limit,
  page,
  setRefresh,
  refresh,
  search,
  setSearch,
  selectedFilters,
  setSelectedFilters,
  handleFilter,
}) {
  // TODO: hooks

  // TODO: use states
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState({});
  const [filterMenus, setFilterMenus] = useState([]);

  // TODO: get the data from slice

  const fetchLoading = useSelector((state) => state.product.fetchLoading);
  const categories = useSelector((state) => state.category.categories);
  const mainCategories = useSelector((state) => state.category.mainCategories);
  // const brands = useSelector((state) => state.brand.brands);

  // TODO: functions
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl({});
  };

  const handleSubmenuClick = (menu) => (event) => {
    setSubmenuAnchorEl((prev) => ({
      ...prev,
      [menu]: event.currentTarget,
    }));
  };

  const handleSubmenuClose = (menu) => () => {
    setSubmenuAnchorEl((prev) => ({
      ...prev,
      [menu]: null,
    }));
  };

  const handleFilterSelect = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    handleFilterClose();
  };

  // TODO: delete the chip
  const handleChipDelete = (key) => () => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];

      if (Object.keys(newFilters).length === 0) {
        setRefresh((prev) => !prev); // Call setRefresh if no filters are left
      }
      return newFilters;
    });
  };

  // TODO:useMemo, when refreshed, set the filter options to empty.
  useMemo(() => {
    setSelectedFilters([]);
  }, [refresh]);

  // TODO: set the filter menus based on category and brand from backend.
  // TODO: since it has dependency of category and brands, it can have duplicate object, so remove it
  useEffect(() => {
    if (categories?.data?.length) {
      setFilterMenus((prev) => {
        // Filter out existing "Category" entries
        const filteredPrev = prev.filter(
          (menu) => menu.title !== "Product for?"
        );
        return [
          ...filteredPrev,
          {
            title: "Product for?",
            options: mainCategories?.map((cat) => ({
              label: cat.name,
              value: cat.id,
            })),
          },
        ];
      });
    }

    // if (brands?.data?.length) {
    //   setFilterMenus((prev) => {
    //     // Filter out existing "Brand" entries
    //     const filteredPrev = prev.filter((menu) => menu.title !== "Brand");
    //     return [
    //       ...filteredPrev,
    //       {
    //         title: "Brand",
    //         options: brands.data.map((brand) => ({
    //           label: brand.name,
    //           value: brand.id,
    //         })),
    //       },
    //     ];
    //   });
    // }

    setFilterMenus((prev) => {
      // Filter out existing "Brand" entries
      const filteredPrev = prev.filter((menu) => menu.title !== "Status");
      return [
        ...filteredPrev,
        {
          title: "Status",
          options: [
            {
              label: "Active",
              value: 1,
            },

            {
              label: "Inactive",
              value: 0,
            },
          ],
        },
      ];
    });
  }, [categories]);

  // TODO: console.log

  return (
    <Box>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          py: 2,
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
          <p>{numSelected} selected</p>
        ) : (
          <p>
            <TitleMd>{title}</TitleMd>
          </p>
        )}

        {numSelected > 0 ? (
          <div className="flex items-center gap-5">
            <button className="flex items-center bg-secondary text-sm text-white p-2 rounded-lg">
              <AiOutlineEdit size={20} />
            </button>
            <button className="flex items-center bg-red text-sm text-white p-2 rounded-lg">
              <MdOutlineDeleteOutline size={20} />
            </button>
            <button className="flex items-center bg-secondary text-sm text-white p-2 rounded-lg">
              <AiOutlinePrinter size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            {showSearch && (
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineSearch
                        size={20}
                        className="text-xl cursor-pointer"
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {showFilter && (
              <Stack flexDirection="row" gap={2}>
                <Button
                  onClick={handleFilterClick}
                  className="flex items-center !bg-secondary !text-sm !text-white p-2.5 px-3 rounded-lg"
                >
                  <MdFilterList size={20} />
                </Button>
              </Stack>
            )}

            {showAdd && (
              <Button
                onClick={setOpenAdd}
                className="flex items-center !bg-primary !text-sm !text-white p-2.5 px-3 rounded-lg"
              >
                <AiOutlinePlus size={15} className="mr-1" />
                Add
              </Button>
            )}

            <Button
              loading={fetchLoading}
              disabled={fetchLoading}
              onClick={() => {
                setRefresh((prev) => !prev);
                setSearch("");
              }}
              className="flex items-center !bg-secondary !text-sm !text-white p-2.5 px-3 rounded-lg"
            >
              <MdOutlineRefresh size={20} />
            </Button>
          </div>
        )}
      </Stack>

      {/* TODO: filtere menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        {filterMenus.map((filterMenu, index) => (
          <div key={index}>
            <MenuItem onClick={handleSubmenuClick(filterMenu.title)}>
              <TitleSm>{filterMenu.title}</TitleSm>
            </MenuItem>
            <Menu
              anchorEl={submenuAnchorEl[filterMenu.title]}
              open={Boolean(submenuAnchorEl[filterMenu.title])}
              onClose={handleSubmenuClose(filterMenu.title)}
            >
              {filterMenu.options.map((option, i) => (
                <MenuItem
                  key={i}
                  onClick={() => handleFilterSelect(filterMenu.title, option)}
                >
                  <TitleSm>{option.label}</TitleSm>
                </MenuItem>
              ))}
            </Menu>
          </div>
        ))}
      </Menu>

      {/* TODO: chips */}
      {Object.entries(selectedFilters).length ? (
        <Box>
          <Divider />
          <Stack
            flexDirection="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingRight={1}
          >
            <Stack
              flex={1}
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={1}
              sx={{ my: 1, ml: 2 }}
            >
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                {Object.entries(selectedFilters).map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key}=${value.label}`}
                    onDelete={handleChipDelete(key)}
                  />
                ))}
              </Stack>

              {/* {Object.entries(selectedFilters).length ? (
                <Button
                  loading={fetchLoading}
                  disabled={
                    fetchLoading || !Object.entries(selectedFilters).length
                  }
                  onClick={handleFilter}
                  className="flex items-center !bg-secondary !text-sm !text-white p-2.5 px-3 rounded-lg"
                >
                  Apply
                </Button>
              ) : null} */}
            </Stack>
          </Stack>
        </Box>
      ) : null}

      <Divider />
    </Box>
  );
}
