import { Link } from "react-router-dom";

export default function Section4() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-full">
    <div className="grid grid-cols-2 gap-12 md:grid-cols-1 sm:grid-cols-1">
      <div className="flex flex-col items-start justify-center gap-6">
        <h1 className="text-[26px] logo font-bold leading-[2rem] text-start">
          Comienza a utilizar Boardify ahora
        </h1>
        <p className="text-[18px]">
          {" "}
          Empieza a utilizar Boardify y descubre el poder de gestionar de
          forma simple y organizada todos tus proyectos. Con Boardify,
          podrás centralizar tus tareas, asignar responsabilidades,
          establecer fechas límite y colaborar con tu equipo de manera
          eficiente. Simplifica tu flujo de trabajo y haz que tus
          proyectos avancen sin complicaciones. ¡Únete a Boardify y lleva
          tus proyectos al siguiente nivel!
        </p>
        <Link   
          to="/register"
          className="bg-[#0065FF] p-3 rounded-md  hover:bg-[#0747A6] transition-all duration-200 "
        >
          Comenzar ahora
        </Link>
      </div>
      <img src="/first-page/start.webp" alt="" />
    </div>
  </div>
  );
}
