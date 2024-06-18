// @mui
import { Link, Stack, Typography } from "@mui/material";
// auth
// layouts
//
import LoginLayout from "../../layouts/login/LoginLayout";
import AuthLoginForm from "./AuthLoginForm";

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative", color: "black" }}>
        <Typography variant="h4">Log in to City Garms</Typography>
      </Stack>

      <AuthLoginForm />

      <Stack direction="row" sx={{ mt: 2, position: "relative" }} spacing={0.5}>
        <Typography variant="body2">
          {`By clicking "Login" you are agreeing to our company's `}
          <Link>Privacy and policy </Link>
          and
          <Link> Terms and conditions</Link>
        </Typography>
      </Stack>

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
