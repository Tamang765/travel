import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import { BiCalendarX } from "react-icons/bi";
import { CiGrid41, CiViewTimeline } from "react-icons/ci";
import { FaProductHunt } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdCategory, MdOutlineInvertColors } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";

import {
  HiOutlineGift,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

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
        title: "Orders",
        path: path(ROOTS_DASHBOARD, "/orders"),
        icon: <AiOutlinePlus size={20} />,
      },
    ],
  },

  {
    title: "Entries",
    icon: <FaProductHunt size={35} color="#ddd" />,
    childrens: [
      {
        title: "Brands",
        path: path(ROOTS_DASHBOARD, "/entries/brands"),
        icon: <SiBrandfolder size={20} />,
      },

      {
        title: "Categories",
        path: path(ROOTS_DASHBOARD, "/entries/categories"),
        icon: <MdCategory size={20} />,
      },

      {
        title: "Sizes",
        path: path(ROOTS_DASHBOARD, "/entries/sizes"),
        icon: <IoMdResize size={20} />,
      },

      {
        title: "Colors",
        path: path(ROOTS_DASHBOARD, "/entries/colors"),
        icon: <MdOutlineInvertColors size={20} />,
      },

      {
        title: "Products",
        path: path(ROOTS_DASHBOARD, "/entries/products"),
        icon: <FaProductHunt size={20} />,
      },
    ],
  },

  {
    title: "Users",
    icon: <HiOutlineUsers size={35} color="#ddd" />,
    childrens: [
      {
        title: "Customers",
        path: path(ROOTS_DASHBOARD, "/users/customers"),
        icon: <HiOutlineUsers size={20} />,
      },

      {
        title: "Roles",
        path: path(ROOTS_DASHBOARD, "/users/roles"),
        icon: <MdOutlineAdminPanelSettings size={20} />,
      },
      // {
      //   title: "Persmissions",
      //   path: path(ROOTS_DASHBOARD, "/users/permissions"),
      //   icon: <MdOutlineLockOpen size={20} />,
      // },
      {
        title: "Promo Code",
        path: path(ROOTS_DASHBOARD, "/users/promo-code"),
        icon: <HiOutlineGift size={20} />,
      },
    ],
  },

  {
    title: "Settings",
    icon: <IoSettings size={20} />,
    childrens: [
      {
        title: "Settings",
        path: path(ROOTS_DASHBOARD, "/settings/refer-delivery"),
        icon: <IoSettings size={20} />,
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
];

export default menu;
