import { Outlet } from "react-router";
import { Header } from "./header";

export const Layout = () => {
  return (
    <div className="relative w-screen h-fit">
      <Header />
      <Outlet />
    </div>
  );
};
