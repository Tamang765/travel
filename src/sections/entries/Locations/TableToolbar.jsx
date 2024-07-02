/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-tailwind/react";
import {
  alpha,
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import {
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineDeleteOutline, MdOutlineRefresh } from "react-icons/md";
import { useSelector } from "react-redux";
import { TitleMd } from "../../../routers";

export function EnhancedTableToolbar({
  numSelected,
  title,
  showAdd,
  showSearch,
  setOpenAdd,
  setRefresh,
  search,
  setSearch,
}) {
  // TODO: hooks

  // TODO: get the data from slice

  const fetchLoading = useSelector((state) => state.product.fetchLoading);

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

      <Divider />
    </Box>
  );
}
