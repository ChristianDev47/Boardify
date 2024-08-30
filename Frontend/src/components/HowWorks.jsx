import Footer from "./Footer";
import Navbar from "./Navbar";
import sliderLeft from "../assets/slider1.svg";
import sliderRight from "../assets/slider2.svg";

export default function HowWorks() {
  return (
    <>
      <Navbar />
      <div className="w-full h-auto relative bg-gradient-to-r from-[#162271] to-[#0081c1] pt-[6rem] sm:pt-[8rem] pb-[6rem] flex flex-col justify-center items-center text-white px-[20%] lg:px-[10%] md:px-[10%] sm:px-[10%] overflow-hidden">
        <img className="absolute left-0 h-full" src={sliderLeft} />
        <img className="absolute right-0 h-full" src={sliderRight} />
        <div className="max-w-7xl p-x6">
        <h1 className="text-[52px] logo font-bold leading-[4rem] text-center my-6 sm:my-1 sm:text-[40px] sm:leading-[3.8rem]">
          Explora las Poderosas Funcionalidades de Boardify
        </h1>
        <p className="px-6 text-center">
          Descubre cómo Boardify puede revolucionar la forma en que organizas
          tus proyectos y colaboras con tu equipo. Desde la gestión ágil de
          tareas hasta la visualización intuitiva de proyectos..
        </p>
        </div>
      </div>
     <div className="flex items-center justify-center w-full bg-gradient-to-r from-[#1F2130] to-[#1f2550] ">
     <div className="w-full max-w-7xl h-full flex flex-col justify-center items-center py-[3rem] px-6 text-white space-y-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 sm:grid-cols-1 ">
          <div className="flex flex-col items-start justify-center xl:min-h-[379px]">
            <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
              {" "}
              Creación de Tableros
            </h1>
            <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
            <p className="mb-14 md:mb-2 sm:mb-2 text-[18px]">
              {" "}
              Inicia creando un tablero para tu proyecto o área de trabajo. Este
              sera el punto central para manajar todos los procesos y tareas.
            </p>
          </div>
          <img src="/works/fun1.webp" alt="" />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1 ">
          <img className="md:hidden sm:hidden" src="/works/fun2.webp" alt="" />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
              Creación de Listas y Tarjetas
            </h1>
            <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
            <p className="mb-14 md:mb-2 sm:mb-2 text-[18px]">
              {" "}
              Dentro del tablero, crea listas para las etapas del proyecto y
              luego añade tarjetas para representar tareas individuales o
              elementos de trabajo.
            </p>
          </div>
          <img
            className="hidden md:block sm:block"
            src="/works/fun2.webp"
            alt=""
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 sm:grid-cols-1 ">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
              {" "}
              Movimiento y Actualización de Tarjetas
            </h1>
            <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
            <p className="mb-14 md:mb-2 sm:mb-2 text-[18px]">
              {" "}
              Mueve las tarjetas entre listas para indicar su progreso y
              actualiza los detalles de las tarjetas según sea necesario.
            </p>
          </div>
          <img src="/works/fun3.webp" alt="" />
        </div>
      </div>
     </div>
      <Footer />
    </>
  );
}
