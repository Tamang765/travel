import { Helmet } from "react-helmet-async";
import Login from "../sections/auth/Login";
// sections
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Ridex Admin Portal</title>
      </Helmet>

      <Login />
    </>
  );
}
