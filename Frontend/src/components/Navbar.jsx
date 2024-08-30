import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import responsiveNav from "../assets/icons/responsiveNav.svg";
import ResponsiveNavLinks from "./Navbar/ResponsiveNavbar";
import Logo from "./Logo";
import Button from "./Principal/Button";

export default function Navbar() {
  const [header, setHeader] = useState(false);
  const { user } = useAuth();
  const [myResNav, setMyResNav] = useState(false);
  const scrollHeader = () => {
    window.scrollY >= 80 ? setHeader(true) : setHeader(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
  }, []);

  return (
    <nav className="relative ">
      <div
        className={`w-full flex justify-center fixed top-0 py-[0.5rem] text-sm transition-all duration-200 ${
          header === true
            ? "backdrop-blur-sm bg-[#000000ce] shadow-sm shadow-black"
            : "bg-transparent"
        } z-50`}
      >
        <div className="grid w-full grid-cols-12 gap-0 px-6 max-w-7xl">
          <Logo/>
          <ul className="flex justify-center items-center col-span-8 px-2 space-x-8 text-[13px] text-white lg:hidden md:hidden sm:hidden">
            <li className="hover:text-[#0065FF] transition-all duration-200">
              <Link to="/">Inicio</Link>
            </li>
            <li className="hover:text-[#0065FF] transition-all duration-200">
              <Link to="/features">Características</Link>
            </li>
            <li className="hover:text-[#0065FF] transition-all duration-200">
              <Link to="/how_works">Cómo funciona</Link>
            </li>
            <li className="hover:text-[#0065FF] transition-all duration-200">
              <Link to="/about">Sobre Nosotros</Link>
            </li>
          </ul>
          <div className="flex justify-end items-center gap-2 col-span-2 lg:col-span-10 md:col-span-10 sm:col-span-10 text-[12px] font-semibold">
            {!Object.entries(user).length > 0 ? (
              <>
              <Button link="/login">
                Iniciar Sesión
              </Button>
              <Button link="/register">
                Empezar
              </Button>
              </>
            ) : (
              <Button link="/miespaciodetrabajo">
                Tus proyectos
              </Button>
            )}
            <div
              className="hidden ml-2 cursor-pointer lg:block md:block sm:block"
              onClick={() => setMyResNav(!myResNav)}
            >
              <img className="w-[30px]" src={responsiveNav} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ResponsiveNavLinks myResNav={myResNav} setMyResNav={setMyResNav} />
    </nav>
  );
}
