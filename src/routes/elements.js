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

// TODO: my profile

export const MyProfile = Loadable(
  lazy(() => import("../pages/myProfile/MyProfile"))
);

// export const Profile = Loadable(lazy(() => import("../pages/general/Profile")));

// TODO: users section

export const Admins = Loadable(
  lazy(() => import("../pages/users/admins/Admin"))
);

export const Customers = Loadable(
  lazy(() => import("../pages/users/customers/Customers"))
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

// TODO: entries
export const Brands = Loadable(lazy(() => import("../pages/entries/Brands")));
export const Exclusive = Loadable(
  lazy(() => import("../pages/entries/Exclusive"))
);

export const Colors = Loadable(lazy(() => import("../pages/entries/Colors")));

export const Sizes = Loadable(lazy(() => import("../pages/entries/Sizes")));
export const Packages = Loadable(
  lazy(() => import("../pages/entries/Packages"))
);
export const Locations = Loadable(
  lazy(() => import("../pages/entries/Location"))
);
export const Categories = Loadable(
  lazy(() => import("../pages/entries/Categories"))
);

export const Vehicles = Loadable(
  lazy(() => import("../pages/entries/Vehicles"))
);

// TODO: content section

export const Blogs = Loadable(lazy(() => import("../pages/content/Blog")));

export const Facts = Loadable(lazy(() => import("../pages/content/Facts")));
export const Gallery = Loadable(lazy(() => import("../pages/content/Gallery")));

// TODO: settings
export const Settings = Loadable(
  lazy(() => import("../pages/settings/Settings"))
);

// TODO: supports

// TODO: emergency contacts
export const EmergencyContacts = Loadable(
  lazy(() => import("../pages/supports/EmergencyContacts"))
);

export const Faqs = Loadable(lazy(() => import("../pages/supports/Faqs")));
