import sliderLeft from '../assets/slider1.svg';
import sliderRight from '../assets/slider2.svg';
import arrow from '../assets/icons/arrowLeft.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bgColors } from '../services/colors';
import { useBoards } from '../hook/boards';
import { useList } from '../hook/lists';
import { useCard } from '../hook/card';
import load from '../assets/icons/load.svg';
import { useRecentBoards } from '../hook/board';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function WelcomecurrentStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const delta = currentStep - previousStep;
  const steps = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];

  const { addBoard } = useBoards();
  const { createList } = useList();
  const { createCard } = useCard();
  // Data
  const [board, setBoard] = useState('');
  const [list, setList] = useState({ list1: '', list2: '', list3: '' });
  const [card, setCard] = useState({ card1: '', card2: '' });
  const [progressButton, setProgresButton] = useState(false);
  const [progressButtonClose, setProgresButtonClose] = useState(false);
  const [closeButton, setCloseButton] = useState(false);
  const { clearBoards } = useRecentBoards();

  const handleListChange = (e) => {
    const { name, value } = e.target;
    setList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigateTo = useNavigate();

  const handleSubmit = async () => {
    setProgresButton(true);
    // const randomIndex = Math.floor(Math.random() * bgColors.length);
    const myBoard = await addBoard(
      board.trim() !== '' ? board : 'Mi Tablero',
      bgColors[0].name
    );

    let myList;
    const defaultList = [
      { name: 'Tareas pendientes' },
      { name: 'Tareas en curso' },
      { name: 'Tareas terminadas' },
    ];
    for (const [index, clave] of Object.keys(list).entries()) {
      const mylist = {
        name: list[clave] !== '' ? list[clave] : defaultList[index].name,
        position: index + 1,
        board_id: myBoard.id,
      };
      const myNewList = await createList(mylist);
      if (index === 0) {
        myList = myNewList._id;
      }
    }

    const defaultCards = [
      { name: 'Planificación del proyecto' },
      { name: 'Reunión inicial' },
    ];

    for (const [index, clave] of Object.keys(card).entries()) {
      const newCard = {
        name: card[clave] !== '' ? card[clave] : defaultCards[index].name,
        is_active: true,
        is_completed: false,
        position: index + 1,
        list_id: myList,
        background: '',
      };
      await createCard(newCard);
    }
    clearBoards();
  };

  const welcomeMessage = () => {
    toast.success(`Bienvenido a tu espacio de trabajo de Boardify`, {
      duration: 4000,
      style: {
        background: '#7DA640',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#000',
      },
    });
  };

  const nextStep = async () => {
    if (currentStep <= steps.length - 1) {
      if (currentStep < steps.length - 1) {
        setPreviousStep(currentStep);
        setCurrentStep((step) => step + 1);
      }
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#1F2130] to-[#1f2550] text-white px-[2rem]">
      <img className="absolute left-0 z-10 h-full" src={sliderLeft} />
      <img className="absolute right-0 z-10 h-full" src={sliderRight} />
      <div className="max-w-[1228px] w-full h-[650px] sm:h-[630px] flex flex-col items-center justify-start bg-[#282b41] rounded-[2rem] overflow-auto z-30">
      <div className="w-full h-[15%] bg-[#0747A6] xl:px-[6rem] 2xl:px-[6rem] px-[1rem] flex justify-center items-center ">
      </div>
        <div className="grid w-full h-full grid-cols-7 gap-4">
          <div className="relative flex flex-col items-start justify-center col-span-3 lg:col-span-4 md:col-span-7 sm:col-span-7">
            <div className="px-[5rem] lg:px-[3rem] md:px-[5rem] sm:px-[2rem]">
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h1 className="logo text-[45px] my-[1rem] sm:text-[24px]">
                    ¡Bienvenido a Boardify!
                  </h1>
                  <p className="my-4 text-[16px]">
                    Ahora. Empecemos a organizar tus proyectos para dejarlo todo
                    muy bien organizado y preparado.
                  </p>
                  <button
                    onClick={nextStep}
                    className=" px-8 py-2 bg-[#0747A6] rounded-md hover:bg-[#0747A6]"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h1 className="logo text-[32px] leading-10 my-[1rem] sm:text-[24px]">
                    El tablero es el inicio de todo
                  </h1>
                  <p className="my-4 text-[14px]">
                    En Boardify los tableros son el punto de partida, el lugar
                    donde tus ideas cobran vida y tus metas se hacen tangibles.
                    Aquí, encontrarás todo lo que necesitas para organizar tus
                    proyectos de manera eficiente: tarjetas, listas, fechas de
                    vencimiento y mucho más.
                  </p>
                  <p className="text-[14px]" htmlFor="board">
                    Introduce el nombre de tu Tablero
                  </p>
                  <input
                    className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 target:border-2 target:border-[#0747A6] text-[14px]"
                    type="text"
                    placeholder="Mi tablero"
                    name="board"
                    aria-invalid="true"
                    onChange={(e) => setBoard(e.target.value)}
                  />
                  <button
                    onClick={nextStep}
                    className=" px-8 py-2 my-4 bg-[#0747A6] rounded-md hover:bg-[#0747A6]"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h1 className="logo text-[32px] leading-10 my-[1rem] sm:text-[24px]">
                    Organice ahora tu tablero con listas
                  </h1>
                  <p className="my-4 text-[14px]">
                    Crea listas para clasificar tus tareas, establecer hitos
                    importantes y seguir el progreso de principio a fin. ¡Haz
                    que tu tablero cobre vida con nuestras listas y lleva tus
                    proyectos al siguiente nivel!
                  </p>
                  <p className="text-[14px]">Empieza creando tus listas</p>
                  <input
                    className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 target:border-2 target:border-[#0747A6] text-[14px] my-1"
                    type="text"
                    placeholder="Por ejemplo: Tareas pendientes"
                    name="list1"
                    aria-invalid="true"
                    onChange={handleListChange}
                  />
                  <input
                    className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 target:border-2 target:border-[#0747A6] text-[14px] my-1"
                    type="text"
                    placeholder="Por ejemplo: Tareas en curso"
                    name="list2"
                    aria-invalid="true"
                    onChange={handleListChange}
                  />
                  <input
                    className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 target:border-2 target:border-[#0747A6] text-[14px] my-1"
                    type="text"
                    placeholder="Por ejemplo: Tareas terminadas"
                    name="list3"
                    aria-invalid="true"
                    onChange={handleListChange}
                  />
                  <button
                    onClick={nextStep}
                    className=" px-8 py-2 my-4 bg-[#0747A6] rounded-md hover:bg-[#0747A6]"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}{' '}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h1 className="logo text-[32px] leading-10 my-[1rem] sm:text-[24px]">
                    Las tarjetas son los elementos basicos de los tableros
                  </h1>
                  <p className="my-4 text-[14px]">
                    Cada tarjeta es una oportunidad para capturar ideas, asignar
                    responsabilidades y realizar un seguimiento del progreso.
                    Con nuestras tarjetas, puedes organizar y visualizar tus
                    actividades de manera clara y eficiente.
                  </p>
                  <p className="text-[14px]">
                    Para empezar crea algunas tarjetas en tus listas
                  </p>
                  <input
                    className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 target:border-2 target:border-[#0747A6] text-[14px] my-1"
                    type="text"
                    placeholder="Por ejemplo: Planificación del proyecto"
                    name="card1"
                    aria-invalid="true"
                    onChange={handleCardChange}
                  />
                  <input
                    className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 target:border-2 target:border-[#0747A6] text-[14px] my-1"
                    type="text"
                    placeholder="Por ejemplo: Reunión inicial"
                    name="card2"
                    aria-invalid="true"
                    onChange={handleCardChange}
                  />
                  <button
                    onClick={() => {
                      handleSubmit();
                      setTimeout(() => {
                        navigateTo('/miespaciodetrabajo');
                        welcomeMessage();
                      }, 3000);
                    }}
                    className=" px-8 py-2 my-4 bg-[#0747A6] rounded-md hover:bg-[#0747A6] min-w-[137px]"
                    disabled={
                      currentStep >= 5 || closeButton === true ? true : false
                    }
                  >
                    <div className="flex items-center justify-center">
                      {progressButton === false ? (
                        <p>Continuar</p>
                      ) : (
                        <div className="w-fit animate-spin">
                          <img
                            className={`top-0 w-[20px] h-[20px] my-1`}
                            src={load}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </button>
                </motion.div>
              )}
            </div>
            <div className="absolute bottom-4 right-0 left-0  flex items-end justify-between  mx-[2rem]">
              <button
                onClick={prevStep}
                className={`flex items-center justify-center ${
                  currentStep === 0 && 'hidden'
                } absolute left-0`}
              >
                <img className="w-[20px] h-auto" src={arrow} />
                Volver
              </button>
              <button
                onClick={() => {
                  clearBoards();
                  setCloseButton(true);
                  setProgresButtonClose(true);
                  setTimeout(() => {
                    navigateTo('/miespaciodetrabajo');
                    welcomeMessage();
                  }, 3000);
                }}
                className="absolute right-0 flex items-center justify-center p-1 bg-gray-600 rounded-md"
              >
                <div className="flex items-center justify-center">
                  {progressButtonClose === false ? (
                    <p>Omitir</p>
                  ) : (
                    <div className="w-fit animate-spin">
                      <img
                        className={`top-0 w-[20px] h-[20px] my-1`}
                        src={load}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
          <div className="bg-[#2e324e] flex items-center justify-center h-full col-span-4 lg:col-span-3 md:hidden sm:hidden">
            <img src="/slider/slide.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
