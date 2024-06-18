import React, { useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { Header, Sidebar } from "../../routers/index";
import menu from "../../routes/paths";

export const Layout = ({ children }) => {
  const { colors } = useTheme();

  // TODO: check whether to show the sidebar menu or not
  const [showSideMenu, setShowSideMenu] = useState(
    menu?.map((m) => ({
      title: m.title,
      show:
        m?.childrens?.length &&
        m?.childrens?.some(
          (c) =>
            c.path === window.location.pathname ||
            (c.childrens &&
              c.childrens.some((a) => a.path === window.location.pathname))
        ),
      active: m.childrens.some(
        (c) =>
          c.path === window.location.pathname ||
          (c.childrens &&
            c.childrens.some((a) => a.path === window.location.pathname))
      ),
    }))
  );

  const isAnyShowTrue = () => {
    return showSideMenu.some((item) => item.show === true);
  };

  return (
    <>
      <Sidebar showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />

      <div
        onClick={() => {
          setShowSideMenu((prev) => {
            return prev.map((data) => {
              return { ...data, show: false };
            });
          });
        }}
      >
        <Header />
      </div>
      <main
        // onClick={() => {
        //   setShowSideMenu((prev) => {
        //     return prev.map((data) => {
        //       return { ...data, show: false };
        //     });
        //   });
        // }}
        style={{
          backgroundColor: colors.bg,
        }}
        className={`p-8 min-h-[calc(100vh-5rem)] transition-all duration-150 ${
          isAnyShowTrue() ? "ml-[350px]" : "ml-[100px]"
        }
         mt-[5rem]  ${
           isAnyShowTrue() ? " w-[calc(100vw-350px)]" : " w-[calc(100vw-100px)]"
         }  `}
      >
        {children}
      </main>
    </>
  );
};
