import { Avatar, Typography } from "@material-tailwind/react";
import { IconButton, MenuItem, Popover } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/useAuthContext";
import { useTheme } from "../../providers/ThemeProvider";
import { PATH_AUTH, ROOTS_DASHBOARD } from "../../routes/paths";
import { SearchBox } from "../common/SearchBox";

const imgSrc =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

export const Header = () => {
  const { toggleTheme, colors } = useTheme();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { logout, user } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  return (
    <header
      style={{
        backgroundColor: colors.bg,
      }}
      className={`shadow-sm flex justify-between items-center h-[5rem] px-8 top-0 fixed
    left-[100px] z-50 right-0`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2">
          <SearchBox />
        </div>

        <div className="flex justify-end items-center gap-5 w-1/2">
          {/* <button onClick={toggleTheme}>
            <FaMoon
              className="cursor-pointer"
              size={30}
              style={{
                color: colors.text,
              }}
            />
          </button> */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="theme toggle"
            onClick={handleOpen}
          >
            <Avatar
              size="md"
              variant="circular"
              src={user?.profile || imgSrc}
              alt="candice wu"
            />
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ul>
              <MenuItem
                onClick={() => navigate(`${ROOTS_DASHBOARD}/my-profile`)}
              >
                <Typography onClick={handleClose}>My Profile</Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout} className="flex">
                <AiOutlineLogout size={22} />
                <Typography className="ml-2">Sign Out</Typography>{" "}
              </MenuItem>
            </ul>
          </Popover>
        </div>
      </div>
    </header>
  );
};
