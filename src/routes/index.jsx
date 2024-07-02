import { Navigate, Outlet, useRoutes } from "react-router-dom";

import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import { PATH_AFTER_LOGIN } from "../config-global";
import CompactLayout from "../layouts/compact/CompactLayout";
import Products from "../pages/entries/Products";
import { Layout } from "../routers";
import {
  Admins,
  Blogs,
  Brands,
  Categories,
  Colors,
  Customers,
  EmergencyContacts,
  Exclusive,
  Faqs,
  LandingPage,
  Locations,
  LoginPage,
  MyProfile,
  Notifications,
  Packages,
  Page404,
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
              path: "exclusive",
              element: (
                <Layout>
                  <Exclusive />
                </Layout>
              ),
            },
            {
              path: "packages",
              element: (
                <Layout>
                  <Packages />
                </Layout>
              ),
            },

            {
              path: "Faq",
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
              path: "pages",
              element: (
                <Layout>
                  <Sizes />
                </Layout>
              ),
            },

            {
              path: "locations",
              element: (
                <Layout>
                  <Locations />
                </Layout>
              ),
            },
          ],
        },
        {
          path: "/admin/content",
          children: [
            {
              path: "blogs",
              element: (
                <Layout>
                  <Blogs />
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
              path: "pages",
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
