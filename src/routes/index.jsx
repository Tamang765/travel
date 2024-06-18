import { Navigate, Outlet, useRoutes } from "react-router-dom";

import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import { PATH_AFTER_LOGIN } from "../config-global";
import CompactLayout from "../layouts/compact/CompactLayout";
import Products from "../pages/entries/Products";
import { Layout } from "../routers";
import {
  Admins,
  Brands,
  Categories,
  Colors,
  Customers,
  DeletedUsers,
  EmergencyContacts,
  Faqs,
  LandingPage,
  LoginPage,
  MyProfile,
  Notifications,
  Page404,
  Riders,
  Roles,
  Settings,
  Sizes,
  TodayRides,
} from "./elements";

//

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "/admin",
      element: (
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: "dashboard",
          element: (
            <Layout>
              <LandingPage />
            </Layout>
          ),
        },

        {
          path: "my-profile",
          element: (
            <Layout>
              <MyProfile />
            </Layout>
          ),
        },

        {
          path: "notifications",
          element: (
            <Layout>
              <Notifications />
            </Layout>
          ),
        },

        {
          path: "orders",
          element: (
            <Layout>
              <TodayRides />
            </Layout>
          ),
        },

        // TODO: users
        {
          path: "/admin/users",
          children: [
            {
              element: <Navigate to="/admin/users/admins" replace />,
              index: true,
            },
            {
              path: "admins",
              element: (
                <Layout>
                  <Admins />
                </Layout>
              ),
            },

            {
              path: "customers",
              element: (
                <Layout>
                  <Customers />
                </Layout>
              ),
            },

            {
              path: "riders",
              element: (
                <Layout>
                  <Riders title={"Riders"} />
                </Layout>
              ),
            },

            {
              path: "today-riders",
              element: (
                <Layout>
                  <Riders title={"Today Riders"} />
                </Layout>
              ),
            },

            {
              path: "deleted-users",
              element: (
                <Layout>
                  <DeletedUsers />
                </Layout>
              ),
            },

            {
              path: "users-otp",
              element: (
                <Layout>
                  <DeletedUsers />
                </Layout>
              ),
            },

            {
              path: "roles",
              element: (
                <Layout>
                  <Roles />
                </Layout>
              ),
            },

            {
              path: "permissions",
              element: (
                <Layout>
                  <Roles />
                </Layout>
              ),
            },

            {
              path: "promo-code",
              element: (
                <Layout>
                  <Roles />
                </Layout>
              ),
            },

            // { path: "add", element: <CreateSeason /> },
            // {
            //   path: "view/:slug",
            //   element: <Seasons isEdit={false} view={true} />,
            // },
            // { path: "detail/:slug", element: <Seasons isEdit={true} /> },
          ],
        },

        // TODO: Entries
        {
          path: "/admin/entries",
          children: [
            {
              element: <Navigate to="/admin/entries/brands" replace />,
              index: true,
            },

            {
              path: "products",
              element: (
                <Layout>
                  <Products />
                </Layout>
              ),
            },

            {
              path: "brands",
              element: (
                <Layout>
                  <Brands />
                </Layout>
              ),
            },

            {
              path: "colors",
              element: (
                <Layout>
                  <Colors />
                </Layout>
              ),
            },

            {
              path: "categories",
              element: (
                <Layout>
                  <Categories />
                </Layout>
              ),
            },

            {
              path: "sizes",
              element: (
                <Layout>
                  <Sizes />
                </Layout>
              ),
            },
          ],
        },

        // TODO: Settings
        {
          path: "/admin/settings",
          children: [
            {
              element: <Navigate to="/admin/settings" replace />,
              index: true,
            },

            {
              path: "refer-delivery",
              element: (
                <Layout>
                  <Settings />
                </Layout>
              ),
            },

            {
              path: "brands",
              element: (
                <Layout>
                  <Brands />
                </Layout>
              ),
            },

            {
              path: "colors",
              element: (
                <Layout>
                  <Colors />
                </Layout>
              ),
            },

            {
              path: "categories",
              element: (
                <Layout>
                  <Categories />
                </Layout>
              ),
            },

            {
              path: "sizes",
              element: (
                <Layout>
                  <Sizes />
                </Layout>
              ),
            },
          ],
        },

        // TODO: supports
        {
          path: "/admin/supports",
          children: [
            {
              element: <Navigate to="/admin/supports/faqs" replace />,
              index: true,
            },

            {
              path: "faqs",
              element: (
                <Layout>
                  <Faqs />
                </Layout>
              ),
            },

            {
              path: "cancel-reasons",
              element: (
                <Layout>
                  <Admins />
                </Layout>
              ),
            },

            {
              path: "emergency-contacts",
              element: (
                <Layout>
                  <EmergencyContacts />
                </Layout>
              ),
            },
          ],
        },
      ],
    },

    {
      element: <CompactLayout />,
      children: [{ path: "404", element: <Page404 /> }],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
