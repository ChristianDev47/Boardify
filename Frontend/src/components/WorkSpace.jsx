/* eslint-disable react-hooks/exhaustive-deps */
import NavbarLeft from "./workspace/NavbarLeft";
import NavbarWorkSpace from "./workspace/NavbarTop";
import { Outlet } from "react-router-dom";
export default function WorkSpace() {
  return (
    <>
      <NavbarWorkSpace />
      <div className="w-full h-full min-h-[100vh] relative  bg-gradient-to-r from-[#1F2130] to-[#1f2550] flex flex-col justify-start items-center text-white py-[5rem]">
        <div className="w-full px-6 max-w-7xl">
          <div className="relative grid w-full grid-cols-7 gap-4">
            <div className="relative w-full col-span-2 pr-2 md:hidden sm:hidden">
              <NavbarLeft />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
