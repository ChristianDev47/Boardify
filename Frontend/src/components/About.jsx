import Footer from "./Footer";
import Navbar from "./Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[#1F2130] to-[#1f2550] px-6	">
      <div className="w-full max-w-7xl relative h-full flex flex-col justify-center items-center py-[3rem]  text-white pt-[6rem]">
        <div className="relative flex flex-col items-center justify-center w-full h-full pb-[8rem]">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[52px] logo font-bold leading-[4rem] text-center my-6 sm:my-1 sm:text-[40px] sm:leading-[3.8rem]">
                Quiénes Somos
              </h1>
              <div className=" text-[18px] space-y-2">
                <p> Descubre todo sobre nuestra compañia y quiénes somos.</p>
              </div>
            </div>
            <img className="w-[704px] h-[354px]" src="/board/about.png" alt=""  />
          </div>
        </div>
        <div className="px-6">
          <div className="flex flex-col items-start justify-center w-full h-full pb-[8rem] gap-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1 ">
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
                  {" "}
                  Qué Hacemos
                </h1>
                <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
                <p className="mb-14 md:mb-0 sm:mb-0 text-[18px]">
                  {" "}
                  Nos dedicamos a proporcionarte las herramientas necesarias
                  para optimizar tus procesos de trabajo y llevar tus proyectos
                  al siguiente nivel. Con una interfaz intuitiva y
                  características potentes, Boardify está diseñado para
                  adaptarse a las necesidades específicas de tu equipo y
                  proyectos. Descubre cómo nuestro enfoque centrado en el
                  usuario y nuestras soluciones innovadoras pueden transformar
                  la forma en que trabajas y colaboras..
                </p>
              </div>
              <img src="/about/a1.png" alt="" />
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1 ">
              <img className="md:hidden sm:hidden" src="/about/a2.png" alt="" />
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
                  La forma en que trabaja tu equipo es única, y Boardify
                  también.
                </h1>
                <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
                <p className="mb-14 md:mb-0 sm:mb-0 text-[18px]">
                  Boardify es la herramienta flexible de gestión del trabajo
                  donde los equipos pueden idear planes, colaborar en proyectos,
                  organizar flujos de trabajo y realizar un seguimiento del
                  progreso de una manera visual, productiva y gratificante.
                  Desde la lluvia de ideas hasta la planificación y la
                  ejecución, Boardify gestiona los grandes hitos y las tareas
                  diarias de trabajar juntos y hacer las cosas..
                </p>
              </div>
              <img
                className="hidden md:block sm:block"
                src="/about/a2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
