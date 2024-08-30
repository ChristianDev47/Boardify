import { Link } from "react-router-dom";
import sliderLeft from "../assets/slider1.svg";
import sliderRight from "../assets/slider2.svg";

export default function Slider() {
  return (
    <div className="w-full h-auto relative bg-gradient-to-r from-[#1F2130] to-[#1f2550] pt-[12rem] sm:pt-[8rem] pb-[4rem] flex flex-col justify-center items-center text-white">
      <div className="flex flex-col items-center justify-center w-full px-6 max-w-7xl" >
        <img className="absolute left-0 h-full" src={sliderLeft} />
        <img className="absolute right-0 h-full" src={sliderRight} />
        <h1 className="text-[42px] logo font-bold leading-[4rem] text-center my-6 sm:my-1 sm:text-[40px] sm:leading-[3.8rem] px-[7.5rem]">
          Boardify reúne todos tus proyectos y administra tus tareas{" "}
        </h1>
        <p className="sm:text-center text-[15px]">
          Mantén todo en el mismo lugar de manera limpia y ordenada
        </p>
        <Link
          to="/register"
          className="bg-[#0065FF] p-3 rounded-md my-6 hover:bg-[#0747A6] transition-all duration-200 "
        >
          ¡Registrate, es gratis!
        </Link>
      </div>
    </div>
  );
}
