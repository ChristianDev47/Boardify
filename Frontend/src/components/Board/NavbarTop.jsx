import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { GetUser } from "../../services/user";
import ArrowSelect from "../../assets/icons/arrowSelect.svg";
import { useRecentBoards } from "../../hook/board";
import { Link } from "react-router-dom";
import ModalUserOptions from "../User/ModalOptions";
import CreateBoard from "../workspace/CreateBoard";
import { charValue } from "../../services/getInitialsUsers";
import ModalToggle from "../../ui/ModalToggle";
import { useBoards } from "../../hook/boards";

export default function NavbarBoard() {
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();
  const { recentBoards } = useRecentBoards();
  const [ recent, setRecents ] = useState([]);
  const { myBoardInfo } = useBoards();
  const { boards } = myBoardInfo;


  useEffect(() => {
    const getUser = async () => {
      const userFound = await GetUser({ id: user.id });
      setMyUser(userFound);
    };
    Object.keys(user).length > 0 && getUser();
  }, [user]);

  useEffect(() => {
    const recentBoard = recentBoards.map(recent => {
      return boards.find(board => recent === board.id )
    })
    setRecents(recentBoard)
  }, [boards])

  const RecentModal = () => {
    return (
      <div className="absolute top-15 left-0 w-[285px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-60">
        {recentBoards &&
          recent.map((board) => {
            return (
              <li className="mx-1 z-[100]" key={board.id}>
                <Link
                  to={`/board/${board.id}`}
                  className="flex items-center justify-start hover:bg-[#d1d1d19b] rounded-lg"
                >
                  <div
                    className={`relative my-2 mx-2  w-[30px] h-[30px] rounded-md overflow-hidden ${
                      !["png", "jpg", "webp"].includes(
                        board.background.split(".").pop().split("?")[0]
                      )
                        ? `bg-gradient-to-r ${board.background}`
                        : `bg-cover bg-center`
                    } flex justify-center items-center z-30 `}
                    style={
                      board.background.split("/")[0] === "local"
                        ? {
                            backgroundImage: `url(/bgImagePreview/${board.background})`,
                          }
                        : board.background.split(":")[0] == "https"
                        ? { backgroundImage: `url(${board.background})` }
                        : null
                    }
                  ></div>
                  <p>{board.title}</p>
                </Link>
              </li>
            );
          })}
      </div>
    );
  };
  return (
    <div
      className={`w-full fixed top-0 pr-[1rem] pl-0 py-[0.5rem] text-sm transition-all duration-200 z-[100] bg-[#1F2130]`}
    >
      <div className="flex items-center justify-between">
        <div className="z-50 flex items-end justify-start col-span-2">
          <ul className="flex justify-start items-end mx-4 px-2 space-x-6 text-[13px] text-white">
            <li className="p-2 transition-all duration-300 rounded-md hover:bg-gray-400">
              <Link
                to="/miespaciodetrabajo"
                className="flex items-center justify-center"
              >
                <img className="w-[29px] h-[29px]" src="/navbar/icon.svg" />
                <div className="flex flex-col items-center justify-center mx-2">
                  <p className=" text-white text-[20px] font-bold logo">
                    Boardify
                  </p>
                </div>
              </Link>
            </li>

            <li>
            <ModalToggle
                modalId="recent-modal"
                toggleButtonId="recent-toggle-btn"
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
            <li>
            <ModalToggle
                  modalId="create_modal"
                  toggleButtonId="recent-toggle-btn"
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
                myUser.name && 
                charValue(myUser.name, myUser.surname)
              }
              myUser={myUser} 
            />
          ) : (
            myUser&&
            myUser.name &&
            myUser.surname && (
              <ModalToggle
                modalId="user_modal"
                toggleButtonId="recent-toggle-btn"
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
