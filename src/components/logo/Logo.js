import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box, Link } from "@mui/material";
import logoImage from "./logo.png";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    // <Box
    //   component="img"
    //   src="../../assets/logo.png"
    //   sx={{ width: '10rem', height: 'auto', margin: 'auto', cursor: 'pointer', ...sx }}
    // />

    // TODO: comment this later
    <Box
      component="img"
      src={logoImage}
      sx={{
        width: "10rem",
        height: "auto",
        margin: "auto",
        cursor: "pointer",
        mixBlendMode: "multiply",
        filter: "invert(100%)",
        ...sx,
      }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
