import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { GetUser } from "../../services/user";
import ArrowSelect from "../../assets/icons/arrowSelect.svg";
import { Link } from "react-router-dom";
import CreateBoard from "./CreateBoard";
import ModalUserOptions from "../User/ModalOptions";
import { charValue } from "../../services/getInitialsUsers";
import RecentModal from "./RecentBoards";
import Options from "./Options";
import ModalToggle from "../../ui/ModalToggle";

export default function NavbarWorkSpace() {
  const { user } = useAuth();
  const [myUser, setMyUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userFound = await GetUser({ id: user.id });
      setMyUser(userFound);
    };
    Object.keys(user).length > 0 && getUser();
  }, [user]);

  return (
    <div
      className={`w-full fixed top-0 py-[0.5rem] text-sm transition-all duration-200 z-50 bg-[#1F2130] flex justify-center`}
    >
      <div className="flex items-center justify-between w-full px-6 max-w-7xl">
        <div className="flex items-end justify-start col-span-2">
          <ul className="flex justify-center items-center  space-x-4 text-[13px] text-white">
            <Link
              to="/miespaciodetrabajo"
              className="p-2 transition-all duration-300 rounded-md hover:bg-gray-400"
            >
              <li className="flex items-center justify-center">
                <img className="w-[29px] h-[29px]" src="/navbar/icon.svg" />
                <div className="flex flex-col items-center justify-center mx-2">
                  <p className=" text-white text-[20px] font-bold logo">
                    Boardify
                  </p>
                </div>
              </li>
            </Link>
            <li>
            <ModalToggle
                modalId="recent-modal"
                toggleButtonId="recent-modal"
                ModalComponent={RecentModal}
                className="relative p-2 transition-all duration-100 rounded-md cursor-pointer hover:bg-gray-400"
                title={
                  <div className="flex items-center justify-center">
                    Recientes{" "}
                    <img className="w-[18px] h-auto ml-1" src={ArrowSelect} alt="arrow" />
                  </div>
                }
              />
            </li>
            <li className="hidden md:block sm:block ">
              <ModalToggle
                  modalId="recent-toggle-btn"
                  toggleButtonId="recent-toggle-btn"
                  ModalComponent={Options}
                  className="relative p-2 transition-all duration-100 rounded-md cursor-pointer hover:bg-gray-400"
                  title={
                    <div className="flex items-center justify-center">
                      Más{" "}
                      <img className="w-[18px] h-auto ml-1" src={ArrowSelect} alt="arrow" />
                    </div>
                  }
                />
            </li>
            <li className="relative">
              <ModalToggle
                  modalId="create_modal"
                  toggleButtonId="create_modal"
                  ModalComponent={CreateBoard}
                  className="relative p-2 transition-all duration-100 rounded-md cursor-pointer hover:bg-gray-400"
                  title={
                    <div className="flex items-center justify-center">
                      Crear{" "}
                      <img className="w-[18px] h-auto ml-1" src={ArrowSelect} alt="arrow" />
                    </div>
                  }
                  options="top"
                />
            </li>
          </ul>
        </div>
        <div className=" flex justify-end items-center text-[12px] font-semibold border-4 border-transparent rounded-full aspect-square  transition-all duration-50">
          {myUser && myUser.profile && myUser.profile !== "" ? (
            <ModalToggle
              modalId="user_modal"
              toggleButtonId="recent-toggle-btn"
              ModalComponent={ModalUserOptions}
              className={` cursor-pointer w-[35px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center  ${
                !["png", "jpg", "webp"].includes(
                  myUser.profile.split(".").pop().split("?")[0]
                )
                  ? `bg-[#0065FF]`
                  : `bg-cover bg-center`
              }`}
              style={
                myUser.profile.split(":")[0] == "https"
                  ? { backgroundImage: `url(${myUser.profile})` }
                  : null
              }
              title={
                myUser.profile.split(":")[0] !== "https" &&
                charValue(myUser.name, myUser.surname)
              }
              myUser={myUser} 
            />
          ) : (
            myUser.name &&
            myUser.surname && (
              <ModalToggle
                modalId="user_modal"
                toggleButtonId="user_modal"
                ModalComponent={ModalUserOptions}
                className="w-[35px] h-[35px] cursor-pointer bg-[#0065FF] text-[16px] font-bold rounded-full aspect-square text-white flex justify-center items-center "
                title={
                  charValue(myUser.name, myUser.surname)
                }
                myUser={myUser} 
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
