import { Link } from "react-router-dom";
import characteristicsIcon from "../../../src/assets/icons/characteristics.svg";


export default function Section2() {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <h1 className="text-[26px] logo font-bold leading-[2rem] mb-4 text-start">
        Trabaja de una manera completamente nueva y adaptada a tus
        necesidades
      </h1>
      <p className=" text-[16px]  ">
        Sencillo, flexible y potente. Todo lo que se necesita son estas
        herramientas para tener una visión clara de como gestionar tus proyectos.
      </p>
      <div className="grid grid-cols-2 gap-8 d:grid-cols-1 sm:grid-cols-1 mt-[2rem]">
        <div className="flex flex-col justify-start items-start bg-[#282b41] p-6 transition-all rounded-lg hover:bg-[#212335] border-[#FF7452] border-l-8">
          <div className="flex items-center justify-center">
            <img
              className="w-[26px] mr-2 h-auto"
              src={characteristicsIcon}
              alt=""
            />
            <p className="text-[20px] font-bold">Tableros, listas y tarjetas</p>
          </div>
          <p className="text-[14px] my-4">
            Boardify organiza proyectos en tableros que contienen listas, y cada
            lista puede contener varias tarjetas. Esto proporciona una
            estructura visualmente clara para organizar tus tareas y
            actividades.
          </p>
          <img src="/characteristics/c1.webp" alt="" />
        </div>
        <div className="flex flex-col justify-start items-start bg-[#282b41] p-6 transition-all rounded-lg hover:bg-[#212335] border-[#2684FF] border-l-8">
          <div className="flex justify-start">
            <img
              className="w-[26px] mr-2 h-auto"
              src={characteristicsIcon}
              alt=""
            />
            <p className="text-[20px] font-bold">Asignación de tareas</p>
          </div>
          <p className="text-[14px] my-4">
            {' '}
            Los usuarios pueden asignar tarjetas a miembros del equipo para
            indicar quién es responsable de completar una tarea específica. Esto
            ayuda a mantener la responsabilidad y la claridad sobre quién está
            trabajando en qué.
          </p>
          <img src="/characteristics/c2.webp" alt="" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 my-8 md:grid-cols-1 sm:grid-cols-1">
        <div className="flex flex-col justify-start items-start bg-[#282b41] p-6 transition-all rounded-lg hover:bg-[#212335] border-[#57D9A3] border-l-8">
          <div className="flex justify-start">
            <img
              className="w-[26px] mr-2 h-auto"
              src={characteristicsIcon}
              alt=""
            />
            <p className="text-[20px] font-bold">Checklists</p>
          </div>
          <p className="text-[14px] my-4">
            {' '}
            Dentro de una tarjeta, puedes crear listas de verificación para
            desglosar tareas o pasos específicos dentro de una tarea más grande.
          </p>
          <img src="/characteristics/c3.webp" alt="" />
        </div>
        <div className="flex flex-col justify-start items-start bg-[#282b41] p-6 transition-all rounded-lg hover:bg-[#212335] border-[#00C7E5] border-l-8">
          <div className="flex justify-start">
            <img
              className="w-[26px] mr-2 h-auto"
              src={characteristicsIcon}
              alt=""
            />
            <p className="text-[20px] font-bold">Archivos y actividad</p>
          </div>
          <p className="text-[14px] my-4">
            {' '}
            Los usuarios pueden adjuntar archivos a las tarjetas y
            registrar su actividad en ellas para lograr un mejor
            seguimiento y control.
          </p>
          <img src="/characteristics/c4.webp" alt="" />
        </div>
        <div className="flex flex-col justify-start items-start bg-[#282b41] p-6 transition-all rounded-lg hover:bg-[#212335] border-[#FFC400] border-l-8">
          <div className="flex justify-start">
            <img
              className="w-[26px] mr-2 h-auto"
              src={characteristicsIcon}
              alt=""
            />
            <p className="text-[20px] font-bold">Fechas de vencimiento</p>
          </div>
          <p className="text-[14px] my-4">
            {' '}
            Puedes establecer fechas de vencimiento en las tarjetas para indicar
            plazos importantes o fechas límite para completar una tarea.
          </p>
          <img src="/characteristics/c5.webp" alt="" />
        </div>
      </div>
      <Link
        to="/features"
        className="bg-[#0065FF] p-3 rounded-md my-6 hover:bg-[#0747A6] transition-all duration-200 "
      >
        Descubre todas las características de Boardify
      </Link>
    </div>
  );
}
