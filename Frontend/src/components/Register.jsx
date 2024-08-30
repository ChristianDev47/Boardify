import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/authSchema";
import { CreateAcount } from "../services/user";
import { useAuth } from "../hook/useAuth";
import toast from "react-hot-toast";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const { addUser, login } = useAuth();
  const navigateTo = useNavigate();

  const onSubmit = async (data) => {
    data = { ...data, profile: "" };
    const user = await CreateAcount({ user: data });
    if (user === undefined) {
      toast.error(`El email ya esta asociado a otra cuenta.`, {
        duration: 4000,
      });
    } else {
      login(user.access_token);
      addUser(user);
      toast.success(`Usuario creado exitosamente. Bienvenido a Boardify`, {
        duration: 4000,
        style: {
          background: "#7DA640",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });
      navigateTo("/inicio");
    }
  };

  return (
    <div className="w-full h-[100vh] min-h-[640px] flex flex-col justify-center items-center bg-gradient-to-r from-[#1F2130] to-[#1f2550] ">
      <div className="flex flex-col items-center justify-start p-8 text-white bg-white rounded-md shadow-2xl">
        <div className="flex items-center justify-start mb-6">
          <img className="w-[35px] h-[35px]" src="/navbar/icon.svg" />
          <div className="flex flex-col items-start justify-center mx-2">
            <p className=" text-black text-[35px] font-extrabold logo">
              Boardify
            </p>
          </div>
        </div>
        <h3 className="text-[#2d2d2d] text-[18px] title font-extrabold">
          Regístrate para crear una cuenta
        </h3>
        <form
          className=" w-full flex justify-center my-4 form text-[14px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-[320px] flex flex-col items-center justify-start space-y-6">
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700"
                type="text"
                name="name"
                {...register("name")}
                placeholder="Introduce tu nombre"
                aria-invalid="true"
              />
              {errors.name?.message && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700"
                type="text"
                name="surname"
                {...register("surname")}
                placeholder="Introduce tu apellido"
                aria-invalid="true"
              />
              {errors.surname?.message && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.surname?.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700"
                type="email"
                name="email"
                {...register("email")}
                placeholder="Introduce tu correo electrónico"
                aria-invalid="true"
              />
              {errors.email?.message && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700"
                type="password"
                name="password"
                {...register("password")}
                placeholder="Introduce tu contraseña"
                aria-invalid="true"
              />
              {errors.password?.message && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <p className="text-[12px] text-[#2d2d2d] pt-4 ">
              Al registrarme, acepto las Condiciones del servicio de Boardify y
              su Política de privacidad.
            </p>
            <button className="py-2 px-3 bg-[#0065FF] text-white hover:bg-[#0747A6] transition-all duration-200 rounded-sm w-full">
              Registrarse
            </button>
            <Link
              to="/login"
              className="text-[#4572b4] hover:border-b border-[#4572b4]"
            >
              ¿Ya tienes una cuenta de Boardify? Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
