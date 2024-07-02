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
  HiOutlineQuestionMarkCircle,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi";

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
        title: "Categories",
        path: path(ROOTS_DASHBOARD, "/entries/categories"),
        icon: <MdCategory size={20} />,
      },
      {
        title: "Inclusive",
        path: path(ROOTS_DASHBOARD, "/entries/brands"),
        icon: <SiBrandfolder size={20} />,
      },

      {
        title: "Exclusive",
        path: path(ROOTS_DASHBOARD, "/entries/exclusive"),
        icon: <MdCategory size={20} />,
      },
      {
        title: "Pages",
        path: path(ROOTS_DASHBOARD, "/entries/pages"),
        icon: <IoMdResize size={20} />,
      },
      {
        title: "Packages",
        path: path(ROOTS_DASHBOARD, "/entries/packages"),
        icon: <MdOutlineInvertColors size={20} />,
      },

      {
        title: "Faq",
        path: path(ROOTS_DASHBOARD, "/entries/faq"),
        icon: <MdOutlineInvertColors size={20} />,
      },

      {
        title: "Products",
        path: path(ROOTS_DASHBOARD, "/entries/products"),
        icon: <FaProductHunt size={20} />,
      },
      {
        title: "Location",
        path: path(ROOTS_DASHBOARD, "/entries/locations"),
        icon: <FaProductHunt size={20} />,
      },
    ],
  },
  {
    title: "Contents",
    icon: <HiOutlineUsers size={35} color="#ddd" />,
    childrens: [
      // {
      //   title: "Admins",
      //   path: path(ROOTS_DASHBOARD, "/users/admins"),
      //   icon: <HiOutlineUsers size={20} />,
      // },
      {
        title: "Blogs",
        path: path(ROOTS_DASHBOARD, "/content/blogs"),
        icon: <HiOutlineUsers size={20} />,
      },

      // {
      //   title: "Roles",
      //   path: path(ROOTS_DASHBOARD, "/users/roles"),
      //   icon: <MdOutlineAdminPanelSettings size={20} />,
      // },
    ],
  },

  {
    title: "Users",
    icon: <HiOutlineUsers size={35} color="#ddd" />,
    childrens: [
      // {
      //   title: "Admins",
      //   path: path(ROOTS_DASHBOARD, "/users/admins"),
      //   icon: <HiOutlineUsers size={20} />,
      // },
      {
        title: "Customers",
        path: path(ROOTS_DASHBOARD, "/users/customers"),
        icon: <HiOutlineUsers size={20} />,
      },

      // {
      //   title: "Roles",
      //   path: path(ROOTS_DASHBOARD, "/users/roles"),
      //   icon: <MdOutlineAdminPanelSettings size={20} />,
      // },
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
