/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../../hook/useAuth";
import {
  CreateUserFiles,
  GetUser,
  GetUserFile,
  UpadetAccount,
} from "../../services/user";
import { useEffect, useState } from "react";
import camera from "../../assets/icons/camera.svg";
import { charValue } from "../../services/getInitialsUsers";

export default function Configuration() {
  const { user, addUser } = useAuth();
  const [myUser, setMyUser] = useState();
  const [backgroundData, setBackgroundData] = useState("");

  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
  useEffect(() => {
    const getUser = async () => {
      const myuser = await GetUser({ id: user.id });
      setMyUser(myuser);
      if (
        myuser.profile &&
        ["jpg", "png", "webp"].includes(
          myuser.profile.split(".").pop().split("?")[0]
        )
      ) {
        getFile(myuser.profile)
          .then(setBackgroundData)
          .catch((error) => {
            console.error("Error fetching file data:", error);
          });
      } else {
        setBackgroundData(myuser.profile);
      }
    };
    Object.keys(user).length > 0 && getUser();
  }, [user]);

  const getFile = async (file) => {
    return await GetUserFile(file);
  };

  const handleSavefile = async (event) => {
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const formData = new FormData();
      formData.append("filename", file.name);
      formData.append("location", file);
      formData.append("user_id", user.id);
      const newProfile = await CreateUserFiles(formData);
      const newData = await UpadetAccount({
        id: user.id,
        data: { profile: newProfile.location },
      });
      setMyUser(newData);
      addUser(newData);
    } else {
      console.error(
        "Invalid file type. Please select a valid file type: JPG, PNG, WEBP, PDF, TXT, DOCX, XLSX, or PPTX."
      );
    }
  };

  const handleDeletefile = async () => {
    const newData = await UpadetAccount({ id: user.id, data: { profile: "" } });
    setMyUser(newData);
    addUser(newData);
  };

  return (
    <>
      {myUser && (
        <div className="w-full my-6">
          <div className="flex justify-between w-[80%] items-end">
            <p className="text-[28px] font-bold">Personalize su imagen</p>
            {myUser.profile && (
              <p onClick={() => handleDeletefile()} className="cursor-pointer">
                Quitar Imagen de perfil
              </p>
            )}
          </div>
          <div className="relative w-[80%]  h-[280px] bg-[#0065FF] my-6 shadow-lg rounded-md">
            <div className="absolute w-full bg-[#1F2130] h-[150px] bottom-0"></div>
            <div className="absolute top-[3rem] left-[2rem] flex justify-end items-center text-[32px] font-semibold border-4  rounded-full aspect-square border-gray-50 transition-all duration-50 group overflow-hidden">
              <input
                type="file"
                id="inputFile"
                className="hidden"
                onChange={(e) => handleSavefile(e)}
              />
              {myUser.profile ? (
                <label
                  className={`relative cursor-pointer w-[120px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                    !["png", "jpg", "webp"].includes(
                      myUser.profile.split(".").pop().split("?")[0]
                    )
                      ? `bg-[#0065FF]`
                      : `bg-cover bg-center`
                  }`}
                  style={
                    myUser.profile.split(":")[0] == "https"
                      ? { backgroundImage: `url(${backgroundData})` }
                      : null
                  }
                >
                  {myUser.profile.split(":")[0] !== "https" &&
                    charValue(myUser.name, myUser.surname)}
                </label>
              ) : (
                <label className="relative cursor-pointer w-[120px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center bg-[#0065FF]">
                  {charValue(myUser.name, myUser.surname)}
                </label>
              )}
              <label
                htmlFor="inputFile"
                className="absolute w-[120px] h-[120px] bg-[#0202027c] hidden justify-center items-center top-0 left-0 group-hover:transition-all group-hover:flex cursor-pointer"
              >
                <img className="w-[30px]" src={camera} alt="" />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
