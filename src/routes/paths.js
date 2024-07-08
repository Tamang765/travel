import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import { BiCalendarX, BiSolidBookContent } from "react-icons/bi";
import { CiGrid41, CiViewTimeline } from "react-icons/ci";
import { FaBlog, FaPage4, FaProductHunt, FaQuestion } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiSurferVan } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { MdCategory, MdOutlinePostAdd } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { SiAzureartifacts } from "react-icons/si";
import { VscExclude } from "react-icons/vsc";
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
      // {
      //   title: "Notification",
      //   path: path(ROOTS_DASHBOARD, "/notifications"),
      //   icon: <AiOutlineCalendar size={20} />,
      // },
      // {
      //   title: "Orders",
      //   path: path(ROOTS_DASHBOARD, "/orders"),
      //   icon: <AiOutlinePlus size={20} />,
      // },
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
        icon: <MdOutlinePostAdd size={20} />,
      },

      {
        title: "Exclusive",
        path: path(ROOTS_DASHBOARD, "/entries/exclusive"),
        icon: <VscExclude size={20} />,
      },
      {
        title: "Pages",
        path: path(ROOTS_DASHBOARD, "/entries/pages"),
        icon: <FaPage4 size={20} />,
      },
      {
        title: "Packages",
        path: path(ROOTS_DASHBOARD, "/entries/packages"),
        icon: <LuPackage size={20} />,
      },

      {
        title: "Faq",
        path: path(ROOTS_DASHBOARD, "/entries/faq"),
        icon: <FaQuestion size={20} />,
      },

      {
        title: "Vehicles",
        path: path(ROOTS_DASHBOARD, "/entries/vehicles"),
        icon: <GiSurferVan size={20} />,
      },
      {
        title: "Location",
        path: path(ROOTS_DASHBOARD, "/entries/locations"),
        icon: <FaLocationDot size={20} />,
      },
    ],
  },
  {
    title: "Contents",
    icon: <BiSolidBookContent size={35} color="#ddd" />,
    childrens: [
      // {
      //   title: "Admins",
      //   path: path(ROOTS_DASHBOARD, "/users/admins"),
      //   icon: <HiOutlineUsers size={20} />,
      // },
      {
        title: "Blogs",
        path: path(ROOTS_DASHBOARD, "/content/blogs"),
        icon: <FaBlog size={20} />,
      },
      {
        title: "Facts",
        path: path(ROOTS_DASHBOARD, "/content/facts"),
        icon: <SiAzureartifacts size={20} />,
      },
      {
        title: "Gallery",
        path: path(ROOTS_DASHBOARD, "/content/gallery"),
        icon: <GrGallery size={20} />,
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

  // {
  //   title: "Support",
  //   icon: <HiOutlineUserCircle size={35} color="#ddd" />,
  //   childrens: [
  //     {
  //       title: "FAQs",
  //       path: path(ROOTS_DASHBOARD, "/supports/faqs"),
  //       icon: <HiOutlineQuestionMarkCircle size={20} />,
  //     },
  //     {
  //       title: "Cancel Reasons",
  //       path: path(ROOTS_DASHBOARD, "/supports/cancel-reasons"),
  //       icon: <BiCalendarX size={20} />,
  //     },

  //     {
  //       title: "Emergency Contacts",
  //       path: path(ROOTS_DASHBOARD, "/supports/emergency-contacts"),
  //       icon: <RiContactsBookLine size={20} />,
  //     },
  //   ],
  // },
];

export default menu;
