import { alpha, Box, Button, Divider, IconButton, Stack } from "@mui/material";
import { AiOutlineEdit, AiOutlinePlus, AiOutlinePrinter } from "react-icons/ai";
import { MdFilterList, MdOutlineDeleteOutline } from "react-icons/md";
import { SearchAwaiting } from "../../pages/frontdesk/awaiting/SearchAwaiting";
import { TitleMd } from "../../routers";

export function EnhancedTableToolbar(props) {
  const { numSelected, title, setOpenAdd } = props;

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
            <TitleMd> {title}</TitleMd>
          </p>
        )}

        {numSelected > 0 ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex items-center gap-5">
              {props.showSearch && <SearchAwaiting />}
              {props.showAdd && (
                <Button
                  onClick={setOpenAdd}
                  className="flex items-center !bg-primary !text-sm !text-white p-2.5 px-6 rounded-lg"
                >
                  <AiOutlinePlus size={18} className="mr-1" />
                  Add
                </Button>
              )}
              {props.showFilter && (
                <IconButton variant="outlined" color="gray">
                  <MdFilterList size={20} />
                </IconButton>
              )}
            </div>
          </>
        )}
      </Stack>
      <Divider />
    </Box>
  );
}
