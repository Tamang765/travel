import PropTypes from "prop-types";
// @mui
import { Container, Typography } from "@mui/material";
// components
// assets//

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role

  const currentRole = "Administrator";
  // const currentRole = user.roles[0].name; // admin;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container
        sx={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h3" paragraph>
          Permission Denied
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          You do not have permission to access this page
        </Typography>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
