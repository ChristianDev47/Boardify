import PropTypes from "prop-types";
import { useEffect } from "react";
import select from "../../assets/icons/arrowSelect.svg";
import { formatNormalDate } from "../../services/dates";
import { useCard } from "../../hook/card";

Dates.propTypes = {
  myCard: PropTypes.object.isRequired,
  setDateStatus: PropTypes.func.isRequired,
  setMyCard: PropTypes.func.isRequired,
  setDateModal: PropTypes.func.isRequired,
};

export default function Dates({
  myCard,
  setDateStatus,
  setMyCard,
  setDateModal,
}) {
  const currentDate = new Date();
  const { updateCard, updateAllCardData } = useCard();

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const time = `${String(formattedDate.getUTCHours()).padStart(2, '0')}:${String(formattedDate.getUTCMinutes()).padStart(2, '0')}`;
    const difference = currentDate.getDate() - formattedDate.getUTCDate();
    if (!myCard.due_date) {
      return `${formattedDate.getUTCDate()} ${formattedDate.toLocaleString("es-ES", {
        month: "short",
      })} a las ${time}`;
    }

    if (difference === -1) {
      return `Mañana a las ${time}`;
    } else if (difference === 0) {
      return `Hoy a las ${time}`;
    } else if (difference === 1) {
      return `Ayer a las ${time}`;
    } else {
      return `${formattedDate.getDate()} ${formattedDate.toLocaleString(
        "es-ES",
        { month: "short" }
      )}. a las ${time}`;
    }
  };

  const determineDateStatus = (date) => {
    const statusOptions = [
      { announce: "Plazo Vencido", color: "#F87168" },
      { announce: "Vence Pronto", color: "#F5CD47" },
      { announce: "Por completar", color: "#6985ff" },
      { announce: "Cumplida", color: "#4BCE97" },
    ];
  

    const currentDate = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);
    const dueDate = new Date(date);
  
    if (myCard.is_completed) return statusOptions[3];
  
    const differenceInMs = dueDate - currentDate;
  
    if (differenceInMs > 0) {
      const oneHourInMs = 60 * 60 * 1000; 
      const oneDayInMs = 24 * oneHourInMs; 

      if (differenceInMs >= oneDayInMs) {
        return statusOptions[2]; 
      }
  
      if (differenceInMs >= oneHourInMs) {
        return statusOptions[2];
      }
      
      const differenceMinutes = Math.floor(differenceInMs / (60 * 1000));
      if (differenceMinutes > 0) {
        return statusOptions[1];
      }
    }
  
    return statusOptions[0]; 
  };
  const status = determineDateStatus(myCard.due_date);

  useEffect(() => {
    setDateStatus(status);
  }, [myCard, setDateStatus]);

  const handleUpdateCard = async (e) => {
    const newData = await updateCard(myCard._id, {
      is_completed: e.target.checked,
    });
    setMyCard((prevState) => ({
      ...prevState,
      is_completed: newData.is_completed,
    }));

    await updateAllCardData({ ...myCard, is_completed: newData.is_completed });
  };

  return (
    <div className="text-[14px] ml-10 mb-10 sm:mr-11">
      {myCard.due_date && myCard.initial_date
        ? `Fechas`
        : myCard.due_date
        ? "Fecha de vencimiento"
        : "Fecha de inicio"}
      <div className="flex items-center justify-start space-x-2">
        {((!myCard.initial_date && myCard.due_date) ||
          (myCard.initial_date && myCard.due_date)) && (
          <input
            className="w-[20px] h-[20px]"
            type="checkbox"
            name=""
            id=""
            checked={myCard.is_completed}
            onChange={(e) => handleUpdateCard(e)}
          />
        )}
        <div
          onClick={() => setDateModal(true)}
          className="flex items-center justify-center px-2 py-1 space-x-2 bg-gray-600 rounded-sm cursor-pointer hover:bg-gray-500 "
        >
          <span>
            {myCard.due_date && myCard.initial_date
              ? `${formatNormalDate(myCard.initial_date)} - ${formatDate(
                  myCard.due_date
                )}`
              : myCard.due_date
              ? formatDate(myCard.due_date)
              : formatNormalDate(myCard.initial_date)}
          </span>
          {(myCard.due_date || !myCard.initial_date) && (
            <div
              className="px-1 my-1 text-black rounded-sm"
              style={{ backgroundColor: status.color }}
            >
              {status.announce}
            </div>
          )}
          <img className="w-[22px]  h-auto" src={select} alt="" />
        </div>
      </div>
    </div>
  );
}
