import { lazy, Suspense } from "react";
import LoadingScreen from "../components/loading-screen";
// components

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import("../pages/LoginPage")));

export const Page404 = Loadable(lazy(() => import("../pages/Page404")));

// TODO: general section
export const LandingPage = Loadable(
  lazy(() => import("../pages/general/Dashboard"))
);

export const Notifications = Loadable(
  lazy(() => import("../pages/general/Notifications"))
);

// export const Profile = Loadable(lazy(() => import("../pages/general/Profile")));

// TODO: users section

export const Admins = Loadable(
  lazy(() => import("../pages/users/admins/Admin"))
);

export const Customers = Loadable(
  lazy(() => import("../pages/users/customers/Customer"))
);

export const DeletedUsers = Loadable(
  lazy(() => import("../pages/users/deletedUsers/DeletedUsers"))
);

// TODO: rides

export const TodayRides = Loadable(
  lazy(() => import("../pages/users/todayRides/TodayRides"))
);

export const Riders = Loadable(
  lazy(() => import("../pages/users/riders/Riders"))
);

// TODO: roles

export const Roles = Loadable(lazy(() => import("../pages/users/roles/Roles")));

// TODO: settings
// TODO: vehicles
export const VehicleBrands = Loadable(
  lazy(() => import("../pages/settings/vehicles/VehicleBrands"))
);

export const VehicleCC = Loadable(
  lazy(() => import("../pages/settings/vehicles/VehicleCC"))
);

export const VehicleColors = Loadable(
  lazy(() => import("../pages/settings/vehicles/VehicleColors"))
);

export const VehicleSymbols = Loadable(
  lazy(() => import("../pages/settings/vehicles/VehicleSymbols"))
);

export const VehicleModels = Loadable(
  lazy(() => import("../pages/settings/vehicles/VehicleModels"))
);

// TODO: supports
// TODO: emergency contacts
export const EmergencyContacts = Loadable(
  lazy(() => import("../pages/supports/EmergencyContacts"))
);
