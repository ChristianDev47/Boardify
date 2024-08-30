import { Link, useLocation } from "react-router-dom";
import Home from "../../assets/icons/home.svg";
import Board from "../../assets/icons/board.svg";
import Menmbers from "../../assets/icons/members.svg";

export default function NavbarLeft() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex flex-col items-start justify-start w-full  h-screen text-white text-[14px]">
      <ul className="w-full space-y-2 ">
        <li>
          <Link
            to="/miespaciodetrabajo"
            className="flex items-center justify-start w-full p-1 rounded-lg  text-[16px]"
          >
            <div className="w-[42px] h-[42px] flex justify-center items-center bg-gradient-to-t from-blue-600 to-violet-600 rounded-lg mr-2">
              B
            </div>
            Espacio de trabajo de Boardify
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/miespaciodetrabajo"
            className={`flex items-center justify-start transition-all duration-100 w-full hover:bg-[#242a58] p-2 my-1 rounded-lg ${
              pathname === "/miespaciodetrabajo"
                ? "bg-[#242a58]"
                : "  bg-transparent"
            }`}
          >
            <img className="w-[17px] h-auto mx-2 " src={Home} alt="" />
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/miespaciodetrabajo/boards"
            className={`flex items-center justify-start transition-all duration-100 hover:bg-[#242a58] w-full p-2 my-1 rounded-lg ${
              pathname === "/miespaciodetrabajo/boards"
                ? "bg-[#242a58]"
                : "  bg-transparent"
            }`}
          >
            <img className="w-[17px] h-auto mx-2 " src={Board} alt="" />
            Tableros
          </Link>
        </li>
        <li>
          <Link
            to="/miespaciodetrabajo/members"
            className={`flex items-center justify-start transition-all duration-100 hover:bg-[#242a58] w-full p-2 my-1 rounded-lg ${
              pathname === "/miespaciodetrabajo/members"
                ? "bg-[#242a58]"
                : "  bg-transparent"
            }`}
          >
            <img className="w-[17px] h-auto mx-2 " src={Menmbers} alt="" />
            Miembros
          </Link>
        </li>
      </ul>
    </div>
  );
}
