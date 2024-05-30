import { IconButton } from "@material-tailwind/react";
import { alpha, Toolbar, Typography } from "@mui/material";
import { AiOutlineEdit, AiOutlinePlus, AiOutlinePrinter } from "react-icons/ai";
import { MdFilterList, MdOutlineDeleteOutline } from "react-icons/md";
import { SearchAwaiting } from "../../../../pages/frontdesk/awaiting/SearchAwaiting";
import { TitleMd } from "../../../../routers";

export function EnhancedTableToolbar({
  numSelected,
  title,
  showAdd,
  showSearch,
  showFilter,
  showPrint,
  setOpenAdd,
}) {
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
            {showSearch && <SearchAwaiting />}
            {showAdd && (
              <button
                onClick={setOpenAdd}
                className="flex items-center bg-primary text-sm text-white p-2.5 px-6 rounded-lg"
              >
                <AiOutlinePlus size={18} className="mr-4" />
                Add
              </button>
            )}
            {showFilter && (
              <IconButton variant="outlined" color="gray">
                <MdFilterList size={20} />
              </IconButton>
            )}

            {showPrint && (
              <button className="flex items-center bg-primary text-sm text-white p-2.5 px-6 rounded-lg">
                <AiOutlinePrinter size={20} />
              </button>
            )}
          </div>
        </>
      )}
    </Toolbar>
  );
}
