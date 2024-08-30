import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Characteristics() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full bg-gradient-to-r from-[#1F2130] to-[#1f2550]">
      <div className="w-full h-full  max-w-7xl flex flex-col px-6 justify-center items-center py-[3rem]  text-white pt-[6rem]">
        <div className="flex flex-col items-center justify-center w-full h-full pb-[8rem]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 sm:grid-cols-1 ">
            <div className="flex flex-col items-center justify-center xl:min-h-[463px]">
              <h1 className="text-[40px] title font-bold leading-[3rem]  text-start mb-4">
                {" "}
                Descubre las Características Clave de Boardify
              </h1>
              <div className=" text-[18px] space-y-2">
                <p>
                  {" "}
                  Explora las características únicas que hacen de Boardify la
                  opción preferida de m illones de equipos en todo el mundo. Con
                  funciones como tableros personalizablesy listas flexibles.{" "}
                </p>
                <p>
                  {" "}
                  Boardify te ayuda a mantener tus proyectos organizados y tu
                  equipo sincronizado. Sumérgete en nuestra guía para descubrir
                  cómo estas características pueden potenciar tu productividad.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end w-full ">
              <img src="/first-page/characteristics.webp" alt=""  /> 
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center w-full h-full pb-[8rem] gap-16 ">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1">
              <img
                className="md:hidden sm:hidden"
                src="/characteristics/c1.webp"
                alt=""
              />
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
                  {" "}
                  Tableros, listas y tarjetas
                </h1>
                <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
                <p className="mb-14 text-[18px]">
                  {" "}
                  Boardify organiza proyectos en tableros que contienen listas,
                  y cada lista puede contener varias tarjetas. Esto proporciona
                  una estructura visualmente clara para organizar tus tareas y
                  actividades.
                </p>
              </div>
              <img
                className="hidden md:block sm:block"
                src="/characteristics/c1.webp"
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1">
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
                  Asignación de tareas
                </h1>
                <div className="h-2 w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
                <p className="mb-14 text-[18px]">
                  {" "}
                  Los usuarios pueden asignar tarjetas a miembros del equipo
                  para indicar quién es responsable de completar una tarea
                  específica. Esto ayuda a mantener la responsabilidad y la
                  claridad sobre quién está trabajando en qué.
                </p>
              </div>
              <img src="/characteristics/c2.webp" alt="" />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full h-full pb-[8rem]">
            <h1 className="text-[32px] logo font-bold leading-[2rem] text-start my-4">
              Algunos otros elementos importantes
            </h1>
            <div className="h-2 w-[600px] md:w-[400px] sm:w-[300px] bg-blue-300 mb-4 bg-gradient-to-r  from-[#162271] to-[#0081c1]"></div>
            <div className="grid grid-cols-3 gap-20 my-4 md:gap-8 sm:gap-5 md:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col items-start justify-start ">
                <div className="w-[150px] h-[150px] my-4">
                  <img
                    className="w-full h-full"
                    src="/characteristics/f1.svg"
                    alt=""
                  />
                </div>
                <div className="px-3">
                  <h3 className="text-[22px] font-bold my-4">Checklists</h3>
                  <p>
                    Dentro de una tarjeta, puedes crear listas de verificación
                    para desglosar tareas o pasos específicos dentro de una
                    tarea más grande.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start ">
                <div className="w-[150px] h-[150px] my-4">
                  <img
                    className="w-full h-full"
                    src="/characteristics/f2.svg"
                    alt=""
                  />
                </div>
                <div className="px-3">
                  <h3 className="text-[22px] font-bold my-4">
                    Archivos y actividades
                  </h3>
                  <p>
                    Los usuarios pueden adjuntar archivos a las tarjetas y
                    registrar su actividad en ellas para lograr un mejor
                    seguimiento y control.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start ">
                <div className="w-[150px] h-[150px] my-4">
                  <img
                    className="w-full h-full"
                    src="/characteristics/f3.svg"
                    alt=""
                  />
                </div>
                <div className="px-3">
                  <h3 className="text-[22px] font-bold my-4">
                    Fechas de vencimiento
                  </h3>
                  <p>
                    Puedes establecer fechas de vencimiento en las tarjetas para
                    indicar plazos importantes o fechas límite para completar
                    una tarea.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
