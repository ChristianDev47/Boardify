/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { updateUserSchema } from "../../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hook/useAuth";
import toast from "react-hot-toast";
import { GetUser, UpadetAccount } from "../../services/user";
import { useEffect } from "react";

export default function Profile() {
  const { user, addUser, login } = useAuth();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    const getData = async () => {
      const myUser = await GetUser({ id: user.id });
      if (myUser) {
        setValue("name", myUser.name || "");
        setValue("surname", myUser.surname || "");
        setValue("email", myUser.email || "");
      }
    };
    Object.entries(user).length > 0 && getData();
  }, [user]);

  const onSubmit = async (data) => {
    if (data.name.trim() === user.name.trim()) delete data.name;
    if (data.surname.trim() === user.surname.trim()) delete data.surname;
    if (data.email.trim() === user.email.trim()) delete data.email;

    const myuser = await UpadetAccount({ id: user.id, data });
    if (myuser === undefined) {
      toast.error(`El email ya esta asociado a otra cuenta.`, {
        duration: 4000,
      });
    } else {
      login(myuser.access_token);
      addUser(myuser);
      toast.success(`Usuario actualizado`, {
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
    }
  };
  return (
    <div className="w-full my-6">
      <p className="text-[28px] font-bold">Gestione su información personal</p>
      <form
        className=" w-[90%] sm:min-w-[390px] flex justify-center my-4 form text-[18px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-start justify-start w-full space-y-6">
          <div className="relative w-full">
            <label className="mx-1" htmlFor="name">
              Nombre
            </label>
            <input
              className={`w-full my-1 p-3 text-gray-50 border rounded-sm outline-none border-[#303438] placeholder:text-gray-50 bg-[#1F2130] ${
                errors.name?.message ? "border-red-500" : "border-[#303438]"
              }`}
              type="text"
              name="name"
              {...register("name")}
              aria-invalid="true"
            />
            {errors.name?.message && (
              <p className="text-[16px] mx-1 absolute text-[#ff2d2d]">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <label className="mx-1" htmlFor="surname">
              Apellido
            </label>
            <input
              className={`w-full my-1 p-3 text-gray-50 border rounded-sm outline-none border-[#303438] placeholder:text-gray-50 bg-[#1F2130] ${
                errors.surname?.message ? "border-red-500" : "border-[#303438]"
              }`}
              type="text"
              name="surname"
              {...register("surname")}
              aria-invalid="true"
            />
            {errors.surname?.message && (
              <p className="text-[16px] mx-1 absolute text-[#ff2d2d]">
                {errors.surname?.message}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <label className="mx-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              className={`w-full my-1 p-3 text-gray-50 border rounded-sm outline-none border-[#303438] placeholder:text-gray-50 bg-[#1F2130] ${
                errors.email?.message ? "border-red-500" : "border-[#303438]"
              }`}
              type="email"
              name="email"
              {...register("email")}
              aria-invalid="true"
            />
            {errors.email?.message && (
              <p className="text-[16px] mx-1 absolute text-[#ff2d2d]">
                {errors.email?.message}
              </p>
            )}
          </div>
          <button className="w-[300px] py-2 px-3 bg-[#0065FF] text-white hover:bg-[#0747A6] transition-all duration-200 rounded-sm ">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
