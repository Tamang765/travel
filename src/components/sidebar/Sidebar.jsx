import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assest/images/LOGO.jpeg";
import { SidebarItem } from "./SidebarItem";
import menu from "../../routes/paths";

export const Sidebar = ({ showSideMenu, setShowSideMenu }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <section
      className="px-8 top-0 fixed
    left-[100px] z-50 right-0"
    >
      <div
        className="sidebar bg-dark"
        // style={{ width: isOpen ? "290px" : "70px" }}
        style={{ width: "100px" }}
      >
        <div className="flex justify-between items-center h-[5rem] px-3 border-b border-gray-800 sticky top-0 left-0 w-full z-50 bg-dark">
          <div
            className="w-full flex justify-center"
            // style={{ display: isOpen ? "block" : "none" }}
          >
            <img
              src={LogoImg}
              alt="LogoImg"
              onClick={goHome}
              className="w-20"
            />
          </div>
        </div>
        <div className="flex flex-col min-h-[calc(100vh-5rem)] gap-2 justify-start mt-5">
          {menu.map((item, index) => {
            return (
              <SidebarItem
                key={index}
                item={item}
                isOpen={isOpen}
                setShowSideMenu={setShowSideMenu}
                showSideMenu={showSideMenu}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
