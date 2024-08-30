import icon1 from "../../../src/assets/icons/boardIcon.svg";
import icon2 from "../../../src/assets/icons/card.svg";
import icon3 from "../../../src/assets/icons/moveCarts.svg";

export default function Section3() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-full ">
    <h1 className="text-[26px] logo font-bold leading-[2rem] text-start mb-4">
      Flujo de trabajo para cualquier proyecto
    </h1>
    <p className="mb-14 text-[16px]">
      Sencillo, flexible y potente. Todo lo que se necesita son estas
      herramientas para tener una visión clara de quién está haciendo qué
      y qué hay que hacer.
    </p>
    <div className="grid grid-cols-3 gap-20 md:grid-cols-2 sm:grid-cols-1">
      <div className="flex flex-col items-start justify-start gap-2">
        <img className="h-[210px]" src={icon1} alt="" />
        <div className="px-3">
          <h3 className="text-[22px] font-bold my-4">
            Creación de Tableros
          </h3>
          <p>
            Inicia creando un tablero para tu proyecto o área de trabajo.
            Este sera el punto central para manajar todos los procesos y
            tareas.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <img className="h-[210px]" src={icon2} alt="" />
        <div className="px-3">
          <h3 className="text-[22px] font-bold my-4">
            Creación de Listas y Tarjetas
          </h3>
          <p>
            Dentro del tablero, crea listas para las etapas del proyecto y
            luego añade tarjetas para representar tareas individuales o
            elementos de trabajo.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <img className="h-[210px]" src={icon3} alt="" />
        <div className="px-3">
          <h3 className="text-[22px] font-bold my-4">
            Movimiento de Tarjetas
          </h3>
          <p>
            Mueve las tarjetas entre listas para indicar su progreso y
            actualiza los detalles de las tarjetas según sea necesario.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}
