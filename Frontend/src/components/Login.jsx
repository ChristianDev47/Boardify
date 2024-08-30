import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginShema } from "../schemas/authSchema";
import { UserLogin } from "../services/user";
import { useAuth } from "../hook/useAuth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginShema),
  });
  const { addUser, login } = useAuth();

  const navigateTo = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await UserLogin({ login: data });
      if (user === undefined) {
        toast.error(`Email o contraseña incorrectos..`, {
          duration: 5000,
        });
      } else {
        login(user.token);
        addUser(user);
        toast.success(`Sesión iniciada. Bienvenido/a ${user.email}.`, {
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
        if (Cookies.get("sesion_security_token")) {
          navigateTo("/miespaciodetrabajo");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error(
        "Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="w-full h-[100vh] min-h-[460px] flex flex-col justify-center items-center bg-gradient-to-r from-[#1F2130] to-[#1f2550] ">
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
          Inicia sesión para continuar
        </h3>
        <form
          className=" w-full flex justify-center my-4 form text-[14px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-[320px] flex flex-col items-center justify-start space-y-6">
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
                autoComplete="current-password"
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
            <button className="py-2 px-3 bg-[#0065FF] text-white hover:bg-[#0747A6] transition-all duration-200 rounded-sm w-full">
              Continuar
            </button>
            <Link
              to="/register"
              className="text-[#4572b4] hover:border-b border-[#4572b4]"
            >
              Crear una cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
