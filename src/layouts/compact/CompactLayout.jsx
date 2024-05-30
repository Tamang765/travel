import { Outlet } from "react-router-dom";
// @mui
import { Container, Stack } from "@mui/material";

// config
//
import Header from "./Header";

// ----------------------------------------------------------------------

export default function CompactLayout() {
  return (
    <>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: "auto",
            maxWidth: 400,
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </>
  );
}
