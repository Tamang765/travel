import { Box } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

const icon = (name) => (
  <img alt={name} src={`/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  coupon: icon("ic_coupon"),
  notification: icon("ic_notification"),
  profile: icon("ic_profile"),
  videohub: icon("ic_pages"),
  settings: icon("ic_settings"),
  tripHour: icon("ic_trip_hr"),
  blogs: icon("ic_blogs"),
  vehicle: icon("ic_vehicle"),
  reports: icon("ic_reports"),
};

const navConfig = [
  // analytics
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.dashboard,
        icon: ICONS.dashboard,
      },
      { title: "Profile", path: PATH_DASHBOARD.profile, icon: ICONS.profile },
      {
        title: "Notifications",
        path: PATH_DASHBOARD.notification,
        icon: ICONS.notification,
      },
    ],
  },
  // User Management
  // ----------------------------------------------------------------------
  {
    subheader: "Contents",
    items: [
      {
        title: "News",
        path: PATH_DASHBOARD.news.root,
        icon: ICONS.blogs,
        children: [
          { title: "News list", path: PATH_DASHBOARD.news.list },
          { title: "Create new news", path: PATH_DASHBOARD.news.add },
        ],
      },
      {
        title: "videohub",
        path: PATH_DASHBOARD.videohub.root,
        icon: ICONS.videohub,
        children: [
          { title: "videohub list", path: PATH_DASHBOARD.videohub.list },
          { title: "Create New Page", path: PATH_DASHBOARD.videohub.create },
        ],
      },

      {
        title: "Testimonials",
        path: PATH_DASHBOARD.testimonials.root,
        icon: ICONS.videohub,
        children: [
          {
            title: "Testimonials list",
            path: PATH_DASHBOARD.testimonials.list,
          },
          {
            title: "Create New Testimonials",
            path: PATH_DASHBOARD.testimonials.create,
          },
        ],
      },
    ],
  },

  {
    subheader: "Contact",
    items: [
      {
        title: "Contact",
        path: PATH_DASHBOARD.contact.root,
        icon: ICONS.blogs,
      },
    ],
  },

  {
    subheader: "Users",
    items: [
      {
        title: "Clients",
        path: PATH_DASHBOARD.registrations.root,
        icon: ICONS.user,
        children: [
          {
            title: "Clients list",
            path: PATH_DASHBOARD.registrations.players.list,
          },
          // { title: 'Add new customer', path: PATH_DASHBOARD.players.add },
        ],
      },
      {
        title: "Admin Users",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "User List", path: PATH_DASHBOARD.user.list },
          { title: "Add new user", path: PATH_DASHBOARD.user.add },
        ],
      },
      {
        title: "Manage Role",
        path: PATH_DASHBOARD.role.root,
        icon: ICONS.user,
        children: [
          { title: "Role list", path: PATH_DASHBOARD.role.list },
          // { title: 'Add new Role', path: PATH_DASHBOARD.role.add },
        ],
      },
    ],
  },
  // LOVs
  // {
  //   subheader: 'LOVS',
  //   items: [
  //     {
  //       title: 'Rates',
  //       path: PATH_DASHBOARD.rates.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Rates List', path: PATH_DASHBOARD.rates.list },
  //         { title: 'Additional charges ', path: PATH_DASHBOARD.rates.additional },
  //         { title: 'Taxation', path: PATH_DASHBOARD.rates.taxation },
  //         { title: 'Day times', path: PATH_DASHBOARD.rates.daytimes },
  //       ],
  //     },
  //     {
  //       title: 'Coupons',
  //       path: PATH_DASHBOARD.coupon.root,
  //       icon: ICONS.coupon,
  //       children: [
  //         { title: 'Coupon List', id: 'coupon-list', path: PATH_DASHBOARD.coupon.list },
  //         { title: 'Add new Coupon', id: 'coupon-create', path: PATH_DASHBOARD.coupon.add },
  //       ],
  //     },
  //     {
  //       title: 'Cancel Reasons',
  //       path: PATH_DASHBOARD.cancel.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Cancel Resons List', path: PATH_DASHBOARD.cancel.list },
  //         { title: 'Add Cancel Reason', path: PATH_DASHBOARD.cancel.add },
  //       ],
  //     },
  //     {
  //       title: 'Policy Type',
  //       path: PATH_DASHBOARD.policyType.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Policy Type List', path: PATH_DASHBOARD.policyType.list },
  //         { title: 'Add Policy Type', path: PATH_DASHBOARD.policyType.add },
  //       ],
  //     },
  //     {
  //       title: 'Trip Hours',
  //       path: PATH_DASHBOARD.tripHours.root,
  //       icon: ICONS.tripHour,
  //       children: [
  //         { title: 'Trip Hours List', path: PATH_DASHBOARD.tripHours.list },
  //         // { title: 'Add Trip Hours', path: PATH_DASHBOARD.tripHours.add },
  //       ],
  //     },
  //     {
  //       title: 'Vehicles',
  //       path: PATH_DASHBOARD.vehicle.root,
  //       icon: ICONS.pages,
  //       children: [
  //         { title: 'Vehicles Type', path: PATH_DASHBOARD.vehicle.vehicle_type_list },
  //         { title: 'Vehicles Model', path: PATH_DASHBOARD.vehicle.vehicle_model_list },
  //         { title: 'Transmission Type', path: PATH_DASHBOARD.vehicle.transmission_type_list },
  //       ],
  //     },
  //   ],
  // },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      {
        title: "Help and Support",
        path: PATH_DASHBOARD.manage.root,
        icon: ICONS.user,
        children: [{ title: "FAQs", path: PATH_DASHBOARD.manage.faqs }],
      },
    ],
  },
];

export default navConfig;
