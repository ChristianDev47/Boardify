import { Link, useParams } from 'react-router-dom';
import Board from '../../assets/icons/board.svg';
import Menmbers from '../../assets/icons/members.svg';
import Calendar from '../../assets/icons/calendar.svg';
import Table from '../../assets/icons/table.svg';
import arrowLeft from '../../assets/icons/arrowLeft.svg';
import arrowRight from '../../assets/icons/arrowRight.svg';
import { useState } from 'react';
import { useBoards } from '../../hook/boards';

export default function NavbarLeft() {
  const { myBoardInfo } = useBoards();
  const { boards } = myBoardInfo;
  const params = useParams();
  const { id } = params;
  const [responsiveNav, setResponsiveNav] = useState(true);

  return (
    <div
    className={`relative flex flex-col items-start w-[18%] min-h-full justify-start text-white text-[14px] bg-[#1F2130] transition-all duration-300 ease-in-out z-150 
      ${responsiveNav ? 'translate-x-0  min-w-[308px] max-w-[308px]' : 'w-[1%] min-w-[1%] max-w-[1%]'}`}
  >
  
      {!responsiveNav && (
        <div
          onClick={() => setResponsiveNav(true)}
          className="bg-[#4a4a4ac6] absolute top-[12px] right-[-15px] cursor-pointer hover:scale-110 p-2 rounded-full aspect-square z-50"
        >
          <img className="w-[15px]" src={arrowRight} alt="" />
        </div>
      )}
      <div
        className={` transition-opacity  ${
          responsiveNav === true ? 'visible opacity-100' : 'invisible opacity-0'
        } duration-1000 ease-in-out z-150`}
      >
        <div className="relative flex items-center justify-between w-full p-1 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="w-[32px] h-[32px] flex justify-center items-center bg-gradient-to-t from-blue-600 to-violet-600 rounded-lg mr-2 mx-6 ">
              B
            </div>
            <p className="md:text-[12px] sm:text-[10px]">
              Espacio de trabajo de Boardify
            </p>
          </div>
          <div
            onClick={() => setResponsiveNav(false)}
            className="hover:bg-[#4a4a4ac6] cursor-pointer hover:scale-110 p-2 mx-2 sm:mx-1"
          >
            <img className="w-[20px]" src={arrowLeft} alt="" />
          </div>
        </div>
        {responsiveNav && (
          <ul className="w-full h-full px-4 pt-4 my-4 border-t border-gray-500 ">
            <li>
              <Link
                to="/miespaciodetrabajo/boards"
                className="flex items-center justify-start transition-all duration-100 hover:bg-[#d1d1d19b] w-full p-2 my-1 rounded-lg"
              >
                <img className="w-[17px] h-auto mx-2 " src={Board} alt="" />
                Tableros
              </Link>
            </li>
            <li>
              <Link
                to="/miespaciodetrabajo/members"
                className="flex items-center justify-start transition-all duration-100 hover:bg-[#d1d1d19b] w-full p-2 my-1 rounded-lg"
              >
                <img className="w-[17px] h-auto mx-2 " src={Menmbers} alt="" />
                Miembros
              </Link>
            </li>
            <p className="mx-3 mt-4">Otros Elementos Importantes</p>
            <li>
              <Link
                to={`/board/${id}`}
                className="flex items-center justify-start transition-all duration-100 hover:bg-[#d1d1d19b] w-full p-2 my-1 rounded-lg"
              >
                <img className="w-[17px] h-auto mx-2 " src={Table} alt="" />
                Tablero
              </Link>
            </li>
            <li>
              <Link
                to={`/board/${id}/table`}
                className="flex items-center justify-start transition-all duration-100 hover:bg-[#d1d1d19b] w-full p-2 my-1 rounded-lg"
              >
                <img className="w-[17px] h-auto mx-2 " src={Table} alt="" />
                Tabla
              </Link>
            </li>
            <li>
              <Link
                to={`/board/${id}/calendar`}
                className="flex items-center justify-start transition-all duration-100 hover:bg-[#d1d1d19b] w-full p-2 my-1 rounded-lg"
              >
                <img className="w-[17px] h-auto mx-2 " src={Calendar} alt="" />
                Calendario
              </Link>
            </li>
            <p className="mx-3 mt-4 mb-2">Sus Ultimos Tableros</p>
            {boards &&
              boards.map((board, index) => {
                return (
                  <li className="mx-2" key={index}>
                    <Link
                      to={`/board/${board.id}`}
                      className="flex items-center justify-start hover:bg-[#d1d1d19b] rounded-lg"
                    >
                      <div
                        className={` max-w-[25px] min-w-[25px] max-h-[25px] min-h-[25px] m-2 rounded-md overflow-hidden mr-3 ${
                          !['png', 'jpg', 'webp'].includes(
                            board.background.split('.').pop().split('?')[0]
                          )
                            ? `bg-gradient-to-r ${board.background}`
                            : `bg-cover bg-center`
                        } flex justify-center items-center z-30 `}
                        style={
                          board.background.split('/')[0] === 'local'
                            ? {
                                backgroundImage: `url(/bgImagePreview/${board.background})`,
                              }
                            : board.background.split(':')[0] == 'https'
                            ? { backgroundImage: `url(${board.background})` }
                            : null
                        }
                      ></div>
                      <p>{board.title}</p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
