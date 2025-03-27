import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
