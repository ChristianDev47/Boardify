import { useState } from "react";
import folder from "../../../src/assets/icons/folder.svg";

export default function Section1() {
  const [selectElement, setSelectElement] = useState("image2");
  const [hoverElement, setHoverElement] = useState(1);
  const options = [
    {
      id: 1,
      title: "Gestiona tus Proyectos",
      description:
        "Mejora la capacidad de organizar tus proyectos de forma visual, utilizando nuestros tableros, listas y tarjetas para representar tareas, estados y prioridades de una manera intuitiva, unica y diferente.",
      image: "image1",
      color: "bg-[#FF7452]",
    },
    {
      id: 2,
      title: "Personalización Flexible",
      description:
        "Los usuarios pueden adaptar sus tableros y tarjetas según sus necesidades, cambiar los fondos, agregar etiquetas, campos personalizados y ajustar las configuraciones para que se adapten a su flujo de trabajo.",
      image: "image2",
      color: "bg-[#2684FF]",
    },
    {
      id: 3,
      title: "Colaboración con miembros",
      description:
        "Permite a los equipos trabajar juntos en proyectos compartidos, agregar comentarios por medio de invitacion, adjuntar archivos, gestionar tareas y realizar actualizaciones de las actividades.",
      image: "image3",
      color: "bg-[#57D9A3]",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center h-full">
    <div className="flex flex-wrap items-start justify-between w-full md:space-x-4 md:justify-center sm:justify-center ">
      {options.map((option) => {
        return (
          <div
            key={option.id}
            onMouseEnter={() => {
              setSelectElement(option.image);
              setHoverElement(option.id);
            }}
            className={`flex flex-col items-start justify-center bg-[#282b41] w-[31%] md:w-[48%] sm:w-[100%] h-auto rounded-lg ${
              hoverElement === option.id ? `opacity-100` : "opacity-60"
            } transition-all duration-200 md:mb-2 sm:mb-4`}
          >
            <div
              className={`items-center justify-center w-full relative flex ${option.color}  h-[3rem] rounded-t-lg`}
            >
              <img
                className=" absolute w-[50px] mr-2 h-auto bottom-[-1.4rem] left-4 rounded-t-lg bg-[#282b41] p-1"
                src={folder}
              />
            </div>
            <div className="px-6 pt-4 pb-6">
              <h3 className="text-[20px] my-2 title font-extrabold">
                {option.title}
              </h3>
              <p className="text-[14px] text-[#d5d5d5] text-pretty">
                {option.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex items-center justify-center w-full mt-4 overflow-hidden rounded-lg h-[38rem] border-[#64646467] border-2">
      <img
        className="object-fill w-full h-full transition-all duration-200"
        src={`/first-page/${selectElement}.png`}
        alt=""
      />
    </div>
  </div>
  );
}
