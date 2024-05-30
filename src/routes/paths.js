// // ----------------------------------------------------------------------

// function path(root, sublink) {
//   return `${root}${sublink}`;
// }

// const ROOTS_DASHBOARD = "/admin";

// // ----------------------------------------------------------------------

// export const PATH_AUTH = {
//   login: "/login",
//   privacy: "/privacy-policy",
// };

// export const PATH_DASHBOARD = {
//   root: ROOTS_DASHBOARD,
//   dashboard: path(ROOTS_DASHBOARD, "/dashboard"),
//   notification: path(ROOTS_DASHBOARD, "/notification"),
//   profile: path(ROOTS_DASHBOARD, "/profile"),
//   search: path(ROOTS_DASHBOARD, "/search"),

//   news: {
//     root: path(ROOTS_DASHBOARD, "/news"),
//     list: path(ROOTS_DASHBOARD, "/news/list"),
//     add: path(ROOTS_DASHBOARD, "/news/add"),
//     edit: (id) => path(ROOTS_DASHBOARD, `/news/edit/${id}`),
//     view: (id) => path(ROOTS_DASHBOARD, `/news/view/${id}`),
//   },

//   // TODO: done by saroj

//   feature: {
//     root: path(ROOTS_DASHBOARD, "/features"),
//     list: path(ROOTS_DASHBOARD, "/features/list"),
//     add: path(ROOTS_DASHBOARD, "/features/add"),
//     edit: (id) => path(ROOTS_DASHBOARD, `/features/edit/${id}`),
//     view: (id) => path(ROOTS_DASHBOARD, `/features/view/${id}`),
//   },

//   sponsors: {
//     root: path(ROOTS_DASHBOARD, "/sponsors"),
//     list: path(ROOTS_DASHBOARD, "/sponsors/list"),
//     add: path(ROOTS_DASHBOARD, "/sponsors/add"),
//     edit: (id) => path(ROOTS_DASHBOARD, `/sponsors/edit/${id}`),
//     view: (id) => path(ROOTS_DASHBOARD, `/sponsors/view/${id}`),
//   },

//   // TODO: nkl settings
//   settings: {
//     root: path(ROOTS_DASHBOARD, "/settings"),
//     seasons: {
//       root: path(ROOTS_DASHBOARD, "/settings/seasons"),
//       list: path(ROOTS_DASHBOARD, "/settings/seasons/list"),
//       add: path(ROOTS_DASHBOARD, "/settings/seasons/add"),
//       detail: (id) => path(ROOTS_DASHBOARD, `/settings/seasons/detail/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/settings/seasons/view/${id}`),
//     },
//     stadiums: {
//       root: path(ROOTS_DASHBOARD, "/settings/stadiums"),
//       list: path(ROOTS_DASHBOARD, "/settings/stadiums/list"),
//       add: path(ROOTS_DASHBOARD, "/settings/stadiums/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/settings/stadiums/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/settings/stadiums/view/${id}`),
//     },

//     keypersons: {
//       root: path(ROOTS_DASHBOARD, "/settings/keypersons"),
//       list: path(ROOTS_DASHBOARD, "/settings/keypersons/list"),
//       add: path(ROOTS_DASHBOARD, "/settings/keypersons/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/settings/keypersons/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/settings/keypersons/view/${id}`),
//     },

//     positions: {
//       root: path(ROOTS_DASHBOARD, "/settings/positions"),
//       list: path(ROOTS_DASHBOARD, "/settings/positions/list"),
//       add: path(ROOTS_DASHBOARD, "/settings/positions/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/settings/positions/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/settings/positions/view/${id}`),
//     },
//   },

//   games: {
//     root: path(ROOTS_DASHBOARD, "/games"),
//     list: path(ROOTS_DASHBOARD, "/games/list"),
//     add: path(ROOTS_DASHBOARD, "/games/add"),
//     lineups: (id) => path(ROOTS_DASHBOARD, `/games/lineup/${id}`),
//     edit: (id) => path(ROOTS_DASHBOARD, `/games/edit/${id}`),
//     view: (id) => path(ROOTS_DASHBOARD, `/games/view/${id}`),
//   },

//   teams: {
//     root: path(ROOTS_DASHBOARD, "/teams"),
//     list: path(ROOTS_DASHBOARD, "/teams/list"),
//     add: path(ROOTS_DASHBOARD, "/teams/add"),
//     edit: (id) => path(ROOTS_DASHBOARD, `/teams/edit/${id}`),
//     view: (id) => path(ROOTS_DASHBOARD, `/teams/view/${id}`),
//     addsquad: (id) => path(ROOTS_DASHBOARD, `/teams/add-squad/${id}`),
//     teamsquad: (id) => path(ROOTS_DASHBOARD, `/teams/squad/${id}`),
//     editsquad: (id) => path(ROOTS_DASHBOARD, `/teams/edit-squad/${id}`),
//   },

//   // -================

//   progress: {
//     root: path(ROOTS_DASHBOARD, "/progress"),
//     list: path(ROOTS_DASHBOARD, "/progress/list"),
//     payment: path(ROOTS_DASHBOARD, "/progress/payment"),
//     details: path(ROOTS_DASHBOARD, "/progress/details"),
//   },
//   completed: {
//     root: path(ROOTS_DASHBOARD, "/completed"),
//     list: path(ROOTS_DASHBOARD, "/completed/list"),
//     payment: path(ROOTS_DASHBOARD, "/completed/payment"),
//   },
//   assign: path(ROOTS_DASHBOARD, "/assign"),
//   ratings: path(ROOTS_DASHBOARD, "/ratings"),
//   user: {
//     root: path(ROOTS_DASHBOARD, "/user"),
//     list: path(ROOTS_DASHBOARD, "/user/list"),
//     add: path(ROOTS_DASHBOARD, "/user/add"),
//   },
//   videohub: {
//     root: path(ROOTS_DASHBOARD, "/videohub"),
//     list: path(ROOTS_DASHBOARD, "/videohub/list"),
//     add: path(ROOTS_DASHBOARD, "/videohub/add"),
//     view: (id) => path(ROOTS_DASHBOARD, `/videohub/view/${id}`),
//     edit: (id) => path(ROOTS_DASHBOARD, `/videohub/edit/${id}`),
//   },

//   photo: {
//     root: path(ROOTS_DASHBOARD, "/photo"),
//     list: path(ROOTS_DASHBOARD, "/photo/list"),
//     add: path(ROOTS_DASHBOARD, "/photo/add"),
//     view: (id) => path(ROOTS_DASHBOARD, `/photo/view/${id}`),
//     edit: (id) => path(ROOTS_DASHBOARD, `/photo/edit/${id}`),
//   },

//   testimonials: {
//     root: path(ROOTS_DASHBOARD, "/testimonials"),
//     list: path(ROOTS_DASHBOARD, "/testimonials/list"),
//     create: path(ROOTS_DASHBOARD, "/testimonials/create"),
//     view: (id) => path(ROOTS_DASHBOARD, `/testimonials/detail/${id}`),
//     edit: (id) => path(ROOTS_DASHBOARD, `/testimonials/edit/${id}`),
//   },

//   contact: {
//     root: path(ROOTS_DASHBOARD, "/contact"),
//     list: path(ROOTS_DASHBOARD, "/contact/list"),
//     create: path(ROOTS_DASHBOARD, "/contact/create"),
//     view: (id) => path(ROOTS_DASHBOARD, `/contact/detail/${id}`),
//     edit: (id) => path(ROOTS_DASHBOARD, `/contact/edit/${id}`),
//   },
//   verified: {
//     root: path(ROOTS_DASHBOARD, "/verified"),
//     players: {
//       root: path(ROOTS_DASHBOARD, "/verified/player"),
//       list: path(ROOTS_DASHBOARD, "/verified/player/list"),
//       add: path(ROOTS_DASHBOARD, "/verified/player/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/verified/player/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/verified/player/view/${id}`),
//     },

//     coach: {
//       root: path(ROOTS_DASHBOARD, "/verified/coach"),
//       list: path(ROOTS_DASHBOARD, "/verified/coach/list"),
//       add: path(ROOTS_DASHBOARD, "/verified/coach/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/verified/coach/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/verified/coach/view/${id}`),
//     },
//   },

//   registrations: {
//     root: path(ROOTS_DASHBOARD, "/registration"),
//     players: {
//       root: path(ROOTS_DASHBOARD, "/registration/player"),
//       list: path(ROOTS_DASHBOARD, "/registration/player/list"),
//       add: path(ROOTS_DASHBOARD, "/registration/player/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/registration/player/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/registration/player/view/${id}`),
//     },

//     coach: {
//       root: path(ROOTS_DASHBOARD, "/registration/coach"),
//       list: path(ROOTS_DASHBOARD, "/registration/coach/list"),
//       add: path(ROOTS_DASHBOARD, "/registration/coach/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/registration/coach/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/registration/coach/view/${id}`),
//     },

//     technical: {
//       root: path(ROOTS_DASHBOARD, "/registration/technical"),
//       list: path(ROOTS_DASHBOARD, "/registration/technical/list"),
//       add: path(ROOTS_DASHBOARD, "/registration/technical/add"),
//       edit: (id) => path(ROOTS_DASHBOARD, `/registration/technical/edit/${id}`),
//       view: (id) => path(ROOTS_DASHBOARD, `/registration/technical/view/${id}`),
//     },

//     users: {
//       root: path(ROOTS_DASHBOARD, "/registration/users"),
//       list: path(ROOTS_DASHBOARD, "/registration/users/list"),
//       add: path(ROOTS_DASHBOARD, "/registration/users/add"),
//     },
//   },

//   role: {
//     root: path(ROOTS_DASHBOARD, "/role"),
//     list: path(ROOTS_DASHBOARD, "/role/list"),
//     add: path(ROOTS_DASHBOARD, "/role/add"),
//   },
//   coupon: {
//     root: path(ROOTS_DASHBOARD, "/coupon"),
//     list: path(ROOTS_DASHBOARD, "/coupon/list"),
//     add: path(ROOTS_DASHBOARD, "/coupon/add"),
//   },

//   logs: {
//     root: path(ROOTS_DASHBOARD, "/logs"),
//     customer: path(ROOTS_DASHBOARD, "/logs/customer"),
//     driver: path(ROOTS_DASHBOARD, "/logs/driver"),
//   },
//   rates: {
//     root: path(ROOTS_DASHBOARD, "/rates"),
//     list: path(ROOTS_DASHBOARD, "/rates/list"),
//     addrate: path(ROOTS_DASHBOARD, "/rates/add-rates"),
//     taxation: path(ROOTS_DASHBOARD, "/rates/taxation"),
//     addtax: path(ROOTS_DASHBOARD, "/rates/add-taxation"),
//     additional: path(ROOTS_DASHBOARD, "/rates/additional-charges"),
//     addadditional: path(ROOTS_DASHBOARD, "/rates/add-additional-charges"),
//     daytimes: path(ROOTS_DASHBOARD, "/rates/day-times"),
//     adddaytimes: path(ROOTS_DASHBOARD, "/rates/add-day-times"),
//   },
//   cancel: {
//     root: path(ROOTS_DASHBOARD, "/cancel-reasons"),
//     list: path(ROOTS_DASHBOARD, "/cancel-reasons/list"),
//     add: path(ROOTS_DASHBOARD, "/cancel-reasons/add"),
//   },
//   policyType: {
//     root: path(ROOTS_DASHBOARD, "/policy-type"),
//     list: path(ROOTS_DASHBOARD, "/policy-type/list"),
//     add: path(ROOTS_DASHBOARD, "/policy-type/add"),
//   },
//   tripHours: {
//     root: path(ROOTS_DASHBOARD, "/trip-hours"),
//     list: path(ROOTS_DASHBOARD, "/trip-hours/list"),
//     add: path(ROOTS_DASHBOARD, "/trip-hours/add"),
//   },
//   vehicle: {
//     root: path(ROOTS_DASHBOARD, "/vehicle"),
//     vehicle_type_list: path(ROOTS_DASHBOARD, "/vehicle/vehicle-type/list"),
//     vehicle_model_list: path(ROOTS_DASHBOARD, "/vehicle/vehicle-model/list"),
//     transmission_type_list: path(
//       ROOTS_DASHBOARD,
//       "/vehicle/transmission-type/list"
//     ),
//   },

//   tripStatus: {
//     root: path(ROOTS_DASHBOARD, "/trip-status"),
//     list: path(ROOTS_DASHBOARD, "/trip-status/list"),
//     add: path(ROOTS_DASHBOARD, "/trip-status/add"),
//   },

//   manage: {
//     root: path(ROOTS_DASHBOARD, "/manage"),
//     privacy: path(ROOTS_DASHBOARD, "/manage/policy"),
//     addprivacy: path(ROOTS_DASHBOARD, "/manage/add-policy"),

//     terms: path(ROOTS_DASHBOARD, "/manage/terms-conditions"),
//     faqs: path(ROOTS_DASHBOARD, "/manage/faqs"),
//     addfaqs: path(ROOTS_DASHBOARD, "/manage/add-faqs"),
//     contact: path(ROOTS_DASHBOARD, "/manage/contact"),
//   },
// };

import {
  AiOutlineCalendar,
  AiOutlinePlus,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { BiCalendarX } from "react-icons/bi";
import { BsEmojiLaughing } from "react-icons/bs";
import { CiGrid41, CiViewTimeline } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { RiContactsBookLine } from "react-icons/ri";

import {
  HiOutlineCreditCard,
  HiOutlineGift,
  HiOutlineMap,
  HiOutlineQuestionMarkCircle,
  HiOutlineStar,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import {
  MdAttachMoney,
  MdDirectionsBike,
  MdHistory,
  MdOutlineAccountCircle,
  MdOutlineAdminPanelSettings,
  MdOutlineLockOpen,
  MdPassword,
  MdPayment,
  MdPedalBike,
  MdUpload,
} from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

export const ROOTS_DASHBOARD = "/admin";

export const PATH_AUTH = {
  login: "/login",
  privacy: "/privacy-policy",
};

function path(root, sublink) {
  return `${root}${sublink}`;
}

export const PATH_DASHBOARD = path(ROOTS_DASHBOARD, "/dashboard");

const menu = [
  {
    title: "General",
    icon: <CiGrid41 size={35} color="#ddd" />,
    childrens: [
      {
        title: "Dashboard",
        path: path(ROOTS_DASHBOARD, "/dashboard"),
        icon: <CiViewTimeline size={20} />,
      },
      {
        title: "Notification",
        path: path(ROOTS_DASHBOARD, "/notifications"),
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        title: "Today Trips",
        path: path(ROOTS_DASHBOARD, "/today-trips"),
        icon: <AiOutlinePlus size={20} />,
      },
    ],
  },
  {
    title: "Maps",
    icon: <HiOutlineMap size={35} color="#ddd" />,
    childrens: [
      {
        title: "Live Tracking",
        path: path(ROOTS_DASHBOARD, "/maps/live-tracking"),
        icon: <HiOutlineMapPin size={20} />,
      },
      {
        title: "Heat Map",
        path: "/heat-map",
        icon: <GiWorld size={20} />,
      },
    ],
  },
  {
    title: "Users",
    icon: <HiOutlineUsers size={35} color="#ddd" />,
    childrens: [
      {
        title: "Admin",
        path: path(ROOTS_DASHBOARD, "/users/admins"),
        icon: <RiAdminLine size={20} />,
      },
      {
        title: "Customers",
        path: path(ROOTS_DASHBOARD, "/users/customers"),
        icon: <HiOutlineUsers size={20} />,
      },
      {
        title: "Riders",
        path: path(ROOTS_DASHBOARD, "/users/riders"),
        icon: <MdDirectionsBike size={20} />,
      },
      {
        title: "Today Riders",
        path: path(ROOTS_DASHBOARD, "/users/today-riders"),
        icon: <MdPedalBike size={20} />,
      },
      {
        title: "Deleted Users",
        path: path(ROOTS_DASHBOARD, "/users/deleted-users"),
        icon: <AiOutlineUserDelete size={20} />,
      },
      {
        title: "Users OTP",
        path: path(ROOTS_DASHBOARD, "/users/users-otp"),
        icon: <MdPassword size={20} />,
      },
      {
        title: "Roles",
        path: path(ROOTS_DASHBOARD, "/users/roles"),
        icon: <MdOutlineAdminPanelSettings size={20} />,
      },
      {
        title: "Persmissions",
        path: path(ROOTS_DASHBOARD, "/users/permissions"),
        icon: <MdOutlineLockOpen size={20} />,
      },
      {
        title: "Promo Code",
        path: path(ROOTS_DASHBOARD, "/users/promo-code"),
        icon: <HiOutlineGift size={20} />,
      },
    ],
  },
  {
    title: "Fare",
    icon: <MdAttachMoney size={35} color="#ddd" />,
    childrens: [
      {
        title: "Set Location",
        path: "/set-location",
        icon: <HiOutlineMapPin size={20} />,
      },
      {
        title: "Manage Fare",
        path: "/manage-fare",
        icon: <MdUpload size={20} />,
      },
    ],
  },

  {
    title: "Accounts",
    icon: <MdOutlineAccountCircle size={35} color="#ddd" />,
    childrens: [
      {
        title: "Transactions",
        path: "/transactions",
        icon: <HiOutlineCreditCard size={20} />,
      },
    ],
  },
  {
    title: "Requests",
    icon: <MdHistory size={35} color="#ddd" />,
    childrens: [
      {
        title: "Trip History",
        path: "/trip-history",
        icon: <MdHistory size={20} />,
      },
    ],
  },

  {
    title: "Ratings",
    icon: <HiOutlineStar size={20} />,
    childrens: [
      {
        title: "Reviews",
        path: "/reviews",
        icon: <HiOutlineStar size={20} />,
      },
      {
        title: "Review & Ratings",
        path: "/review-ratings",
        icon: <HiOutlineStar size={20} />,
      },

      {
        title: "Customer Ratings",
        path: "/customer-ratings",
        icon: <BsEmojiLaughing size={20} />,
      },
      {
        title: "Rider Ratings",
        path: "/rider-ratings",
        icon: <BsEmojiLaughing size={20} />,
      },
    ],
  },
  {
    title: "Support",
    icon: <HiOutlineUserCircle size={35} color="#ddd" />,
    childrens: [
      {
        title: "FAQs",
        path: path(ROOTS_DASHBOARD, "/supports/faqs"),
        icon: <HiOutlineQuestionMarkCircle size={20} />,
      },
      {
        title: "Cancel Reasons",
        path: path(ROOTS_DASHBOARD, "/supports/cancel-reasons"),
        icon: <BiCalendarX size={20} />,
      },

      {
        title: "Emergency Contacts",
        path: path(ROOTS_DASHBOARD, "/supports/emergency-contacts"),
        icon: <RiContactsBookLine size={20} />,
      },
    ],
  },
  {
    title: "Settings",
    icon: <MdPayment size={35} color="#ddd" />,
    childrens: [
      {
        title: "Vehicles",
        path: path(ROOTS_DASHBOARD, "/settings/vehicles"),
        icon: <FaCar size={20} />,

        childrens: [
          {
            title: "Types",
            path: path(ROOTS_DASHBOARD, "/settings/vehicles/types"),
            icon: <FaCar size={20} />,
          },
          {
            title: "Brands",
            path: path(ROOTS_DASHBOARD, "/settings/vehicles/brands"),
            icon: <FaCar size={20} />,
          },

          {
            title: "CC",
            path: path(ROOTS_DASHBOARD, "/settings/vehicles/cc"),
            icon: <FaCar size={20} />,
          },

          {
            title: "Colors",
            path: path(ROOTS_DASHBOARD, "/settings/vehicles/colors"),
            icon: <FaCar size={20} />,
          },

          {
            title: "Symbols",
            path: path(ROOTS_DASHBOARD, "/settings/vehicles/symbols"),
            icon: <FaCar size={20} />,
          },

          {
            title: "Models",
            path: path(ROOTS_DASHBOARD, "/settings/vehicles/models"),
            icon: <FaCar size={20} />,
          },
        ],
      },
    ],
  },
];

export default menu;
