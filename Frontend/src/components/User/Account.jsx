import { Link, Outlet } from "react-router-dom";
import NavbarWorkSpace from "../workspace/NavbarTop";
import { useLocation } from "react-router-dom";
import { charValue } from "../../services/getInitialsUsers";
import { useAuth } from "../../hook/useAuth";

export default function Account() {
  const { user } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  return (

      <div
        className={`relative w-full h-full flex justify-center items-center z-30 sm:min-w-[450px] `}
      >
        <NavbarWorkSpace />
        <div className="w-full h-screen flex flex-col items-start justify-start bg-[#282b41]  overflow-auto pt-28 px-[12rem] lg:px-[4rem] md:px-[4rem] sm:px-[2rem] z-30 text-white">
          <div className="flex flex-col items-start justify-start w-full py-3">
            <div className="flex items-center justify-center">
              {user.profile && user.profile !== "" ? (
                <div
                  className={`relative cursor-pointer w-[80px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                    !["png", "jpg", "webp"].includes(
                      user.profile.split(".").pop().split("?")[0]
                    )
                      ? `bg-[#0065FF]`
                      : `bg-cover bg-center`
                  }`}
                  style={
                    user.profile.split(":")[0] == "https"
                      ? { backgroundImage: `url(${user.profile})` }
                      : null
                  }
                >
                  {user.profile.split(":")[0] !== "https" &&
                    charValue(user.name, user.surname)}
                </div>
              ) : (
                <div className=" w-[80px] h-[80px]  bg-[#0065FF] text-[24px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                  {charValue(user.name, user.surname)}
                </div>
              )}

              <div className="mx-4 text-[20px]">
                <p className="font-bold">
                  {user.name} {user.surname}
                </p>
                <p className="text-[16px]">{user.email}</p>
              </div>
            </div>
            <div className="w-full">
              <ul className="flex w-full mt-8 space-x-12 font-bold">
                <li
                  className={`py-3 cursor-pointer hover:text-[#0065FF] ${
                    pathname === "/user/account"
                      ? "text-[#0065FF] border-b border-[#0065FF]"
                      : "  text-white"
                  }`}
                >
                  <Link to="/user/account">Perfil y visibilidad</Link>
                </li>
                <li
                  className={`py-3 cursor-pointer hover:text-[#0065FF] ${
                    pathname === "/user/account/configuration"
                      ? "text-[#0065FF] border-b border-[#0065FF]"
                      : "  text-white"
                  }`}
                >
                  <Link to="/user/account/configuration">
                    Personalize su imagen
                  </Link>
                </li>
              </ul>
              <div className="border-b border-gray-50 w-[90%] sm:min-w-[390px] "></div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    )
}
