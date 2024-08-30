import { Link } from "react-router-dom";

const options = [
  {name: "Inicio", link: "/miespaciodetrabajo"},
  {name: "Tableros", link: "/miespaciodetrabajo/boards"},
  {name: "Miembros", link: "/miespaciodetrabajo/members"}
]
export default function Options() {
  return (
    <ul className="absolute top-10 2xl:left-0 xl:left-0 lg:left-0 md:left-0 sm:right-0 w-[250px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      {
        options.map((option, index) => {
          return (
            <li key={index}>
              {" "}
              <Link
                to={option.link}
                className={`flex items-center justify-start transition-all duration-100 w-full hover:bg-[#242a58] p-2 my-1 rounded-lg`}
              >
                {option.name}
              </Link>
            </li>
          )
        })
      }
    </ul>
  );
}
