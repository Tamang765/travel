import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// components
import LoadingScreen from "../components/loading-screen";
//
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import Login from "../pages/LoginPage";
import { fetchRoles } from "../redux/slices/roleSlice";
import { fetchUserTypes } from "../redux/slices/userTypeSlice";
import { useAuthContext } from "./useAuthContext";
import { fetchCategories } from "../redux/slices/categorySlice";

// ----------------------------------------------------------------------
AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  // TODO: fetch the common data here

  useEffect(() => {
    dispatch(fetchCategories({ enqueueSnackbar }));
    // dispatch(fetchUserTypes({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

  // ===================

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    // TODO: change this to !isAuthenticated
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
