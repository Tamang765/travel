import { Close } from "@mui/icons-material";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export const SidebarItem = ({
  item,
  isOpen,
  setShowSideMenu,
  showSideMenu,
  index,
}) => {
  const [expandMenu, setExpandMenu] = useState(
    item.childrens.map((m) => ({
      title: m?.title,
      show: m?.childrens?.some((c) => c.path === window.location.pathname),
    }))
  );

  if (item.childrens) {
    return (
      <div
        className={`
          ${
            showSideMenu &&
            showSideMenu[index].title === item.title &&
            showSideMenu[index].show
              ? "sidebar-item s-parent open"
              : "sidebar-item s-parent"
          }`}
      >
        <div className={`sidebar-title`}>
          <div
            className="cursor-pointer flex flex-col justify-center items-center w-full"
            onClick={() =>
              setShowSideMenu((prev) => {
                return prev.map((data) => {
                  if (data.title === item.title) {
                    return { ...data, show: !data.show, active: true };
                  }
                  return { ...data, show: false, active: false };
                });
              })
            }
          >
            <div
              className={`flex flex-col gap-1 justify-center items-center w-full ${
                showSideMenu &&
                showSideMenu[index].title === item.title &&
                showSideMenu[index].active
                  ? "activeSide"
                  : "link"
              }`}
            >
              {item.icon && <div className="icon">{item.icon}</div>}
              <div className="text-xs font-normal">{item.title}</div>
            </div>
          </div>
        </div>

        {/* TODO: sidebar's sidebar */}
        <div className="sidebar-content fixed top-[5rem] left-[100px] shadow-2xl shadow-black bottom-0">
          <div className="w-full flex justify-end p-2">
            <div
              className="w-fit"
              onClick={() =>
                setShowSideMenu((prev) => {
                  return prev.map((data) => ({
                    ...data,
                    show: false,
                  }));
                })
              }
            >
              <Close className="cursor-pointer" />
            </div>
          </div>

          {item.childrens.map((children, index) => {
            return (
              <div key={index} className="s-child m-2 mr-0">
                {children.childrens ? (
                  <div className={"relative"}>
                    <div
                      className={`sidebar-title cursor-pointer`}
                      onClick={() =>
                        setExpandMenu((prev) => {
                          return prev.map((data) => ({
                            ...data,
                            ...(data.title === children.title && {
                              show: !data.show,
                            }),
                          }));
                        })
                      }
                    >
                      <span>
                        {children.icon && (
                          <div className="icon">{children.icon}</div>
                        )}
                        {isOpen && (
                          <div className="title uppercase">
                            {children.title}
                          </div>
                        )}
                      </span>
                      <MdKeyboardArrowRight
                        size={25}
                        className={`arrow-icon ${
                          expandMenu?.[index]?.show && "rotate-90"
                        }`}
                      />
                    </div>

                    <div
                      className={`scale-y-0 h-0 transition-all ease-in-out duration-300 origin-top bg-white bg-opacity-5 p-2  pr-0 ${
                        expandMenu?.[index]?.show &&
                        "scale-y-100 h-auto rounded-l-lg pt-6 mt-2"
                      }`}
                    >
                      {children.childrens.map((child, index) => {
                        return (
                          <div key={index} className="s-child">
                            <Link
                              to={child.path}
                              className={
                                child.path === window.location.pathname
                                  ? "active"
                                  : "link"
                              }
                            >
                              <div className="sidebar-item">
                                <div className="sidebar-title">
                                  <span>
                                    {child.icon && (
                                      <div className="icon">{child.icon}</div>
                                    )}
                                    {isOpen && (
                                      <div className="title">{child.title}</div>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={children.path}
                    className={
                      children.path === window.location.pathname
                        ? "active"
                        : "link"
                    }
                  >
                    <div className="sidebar-item">
                      <div className="sidebar-title">
                        <span className="ml-1">
                          {children.icon && (
                            <div className="icon">{children.icon}</div>
                          )}
                          <div className="title">{children.title}</div>
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={item.path}
        className={item.path === window.location.pathname ? "active" : "link"}
      >
        <div className="sidebar-item">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div className="title">{item.title}</div>}
            </span>
          </div>
        </div>
      </Link>
    );
  }
};
