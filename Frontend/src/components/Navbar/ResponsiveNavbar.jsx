import PropTypes from "prop-types";
import { Link } from "react-router-dom";

ResponsiveNavLinks.propTypes = {
  myResNav: PropTypes.bool.isRequired,
  setMyResNav: PropTypes.func.isRequired,
};
const links = [
  { id: 1, name: "Inicio", href: "/" },
  { id: 2, name: "Características", href: "/features" },
  { id: 3, name: "Cómo funciona", href: "/how_works" },
  { id: 4, name: "Sobre Nosotros", href: "/about" },
];

export default function ResponsiveNavLinks({ myResNav, setMyResNav }) {
  return (
    <div
      className={`fixed w-full top-0 r-0 transition-transform  ${
        !myResNav ? "translate-y-[-150%]" : "translate-y-[0%]"
      } duration-500 ease-in-out box-shadow-md z-20 hidden lg:block md:block sm:block`}
    >
      <div className=" pb-6 px-28 md:px-12 sm:px-12 pt-24  bg-[#07080A] rounded-b-2xl divide-y-[15px] divide-transparent 2xl:hidden xl:hidden z-20">
        <ul className="flex flex-col  justify-end text-end text-sm items-end bg-transparent rounded-b-2xl divide-y-[30px] divide-transparent 2xl:hidden xl:hidden">
          {links.map((link, index) => {
            return (
              <li key={link.id || index}>
                <Link
                  to={link.href}
                  className={`hover:text-[#0065FF] text-white`}
                >
                  <button onClick={() => setMyResNav(false)}>
                    {link.name}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
