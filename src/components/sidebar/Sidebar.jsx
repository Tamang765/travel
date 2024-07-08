import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../../routes/paths";
import LogoImg from "../assest/images/logo.png";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ showSideMenu, setShowSideMenu }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <section>
      <div
        className="bg-dark fixed w-[250px] top-0 left-0"
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
              className="w-80 aspect-square object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col overflow-y-scroll h-[calc(100vh-6.1rem)] gap-2 justify-start mt-5">
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
