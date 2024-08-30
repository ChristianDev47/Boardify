import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import close from "../../assets/icons/x.svg";
import PropTypes from "prop-types";
registerLocale("es", es);

import "../../styles/data-picker.css";
import { useState } from "react";
import { useEffect } from "react";
import { useCard } from "../../hook/card";
import {
  convertToLocalISOString,
  formDate,
  formDateExt,
  formHour,
  formHourExt,
  isValidDate,
  isValidTime,
  originalFormat,
} from "../../services/dates";

CreateDateComponent.propTypes = {
  myCard: PropTypes.object.isRequired,
  setMyCard: PropTypes.func.isRequired,
  setDateModal: PropTypes.func.isRequired,
};

export default function CreateDateComponent({
  myCard,
  setMyCard,
  setDateModal,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkStartDate, setCheckStartDate] = useState(false);
  const [checkEndDate, setCheckEndDate] = useState(false);
  const [fullEndDate, setFullEndDate] = useState({
    date: formDate(new Date()),
    hour: formHour(new Date()),
  });
  

  const [fullStartDate, setFullStartDate] = useState({
    date: formDate(new Date()),
    hour: formHour(new Date()),
  });
  const { updateCard, updateAllCardData } = useCard();

  const onChange = (dates) => {
    if (checkEndDate && !checkStartDate) {
      setFullEndDate({ date: formDate(dates[0]), hour: formHour(dates[0]) });
      setEndDate(dates[0]);
      setStartDate(dates[0]);
      return;
    } else if (!checkEndDate && checkStartDate) {
      if(dates[0]){
        setFullStartDate({ date: formDate(dates[0]) });
        setStartDate(dates[0]);
        setEndDate(dates[0]);
      }else{
        setFullStartDate({ date: new Date() });
      }
      return;
    } else if (checkEndDate && checkStartDate) {

      setFullEndDate({ date: formDate(dates[1]), hour: formHour(dates[1]) });
      setFullStartDate({ date: formDate(dates[0]), hour: formHour(dates[0]) });
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };
  useEffect(() => {
    if (myCard.initial_date && myCard.due_date) {
      setCheckEndDate(true);
      setCheckStartDate(true);
      setFullStartDate({date: formDateExt(myCard.initial_date)})
      setFullEndDate({date: formDateExt(myCard.due_date), hour:formHourExt(myCard.due_date)})
      setStartDate(originalFormat(formDateExt(myCard.initial_date), formHourExt(myCard.initial_date)));
      setEndDate(originalFormat(formDateExt(myCard.due_date), formHourExt(myCard.due_date)));
    } else if (myCard.due_date) {
      setCheckEndDate(true);
      setFullEndDate({
        date: formDateExt(myCard.due_date),
        hour: formHourExt(myCard.due_date),
      });
      setStartDate(originalFormat(formDateExt(myCard.due_date), formHourExt(myCard.due_date)));
      setEndDate(originalFormat(formDateExt(myCard.due_date), formHourExt(myCard.due_date)));
    } else if (myCard.initial_date) {
      setCheckStartDate(true);
      setStartDate(originalFormat(formDateExt(myCard.initial_date), formHourExt(myCard.initial_date)));
      setEndDate(originalFormat(formDateExt(myCard.initial_date), formHourExt(myCard.initial_date)));
      setFullStartDate({ date: formDateExt(myCard.initial_date) });
    } else {
      setCheckEndDate(true);
    }
  }, [myCard]);

  const handleSaveDate = async () => {
    let newDate;
    if (startDate.getFullYear && endDate.getFullYear) {
      const startDateLocal = convertToLocalISOString(startDate);
      const endDateLocal = convertToLocalISOString(originalFormat(fullEndDate.date, fullEndDate.hour));

      if (checkEndDate && !checkStartDate) {
        newDate = await updateCard(myCard._id, {
          initial_date: null,
          due_date: endDateLocal,
        });
        setMyCard({
          ...myCard,
          initial_date: null,
          due_date: newDate.due_date,
        });
        await updateAllCardData({
          ...myCard,
          initial_date: null,
          due_date: newDate.due_date,
        });
      } else if (checkStartDate && !checkEndDate) {
        newDate = await updateCard(myCard._id, {
          initial_date: startDateLocal,
          due_date: null,
        });
        setMyCard({
          ...myCard,
          initial_date: newDate.initial_date,
          due_date: null,
        });
        await updateAllCardData({
          ...myCard,
          initial_date: newDate.initial_date,
          due_date: null,
        });
      } else if (checkEndDate && checkStartDate) {
        newDate = await updateCard(myCard._id, {
          initial_date: startDateLocal,
          due_date: endDateLocal,
        });
        setMyCard({
          ...myCard,
          initial_date: newDate.initial_date,
          due_date: newDate.due_date,
        });
        await updateAllCardData({
          ...myCard,
          initial_date: newDate.initial_date,
          due_date: newDate.due_date,
        });
      } else {
        handleDeleteDate();
      }
    }
    setDateModal(false);
  };

  const handleDeleteDate = async () => {
    await updateCard(myCard._id, { due_date: null, initial_date: null });
    setMyCard({ ...myCard, due_date: null, initial_date: null });
    await updateAllCardData({ ...myCard, due_date: null, initial_date: null });
    setDateModal(false);
  };

  const onchangeStartDate = (e) => {
    if(isValidDate(e.target.value)){
      checkEndDate && checkStartDate 
      ? [
          originalFormat(e.target.value, fullEndDate.hour),
          originalFormat(fullEndDate.date, fullEndDate.hour),
        ]
      : [originalFormat(e.target.value, fullStartDate.hour)]
    }else{
      setFullStartDate((prevState) => ({
        ...prevState,
        date: formDate(new Date()),
      }))
    }
  };

  const onchangeEndDate = (e) => {
    if(isValidDate(e.target.value)){
      checkEndDate && checkStartDate
      ? [
          originalFormat(
            fullStartDate.date,
            fullStartDate.hour
          ),
          originalFormat(e.target.value, fullEndDate.hour),
        ]
      : [originalFormat(e.target.value, fullEndDate.hour)]
    }else{
      setFullEndDate((prevState) => ({
        ...prevState,
        date: formDate(new Date()),
      }))
    }
  };

  const onchangeEndDateHour = (e) => {
    if(isValidTime(e.target.value)){

      checkEndDate && checkStartDate
      ? [
          originalFormat(
            fullStartDate.date,
            fullStartDate.hour
          ),
          originalFormat(fullEndDate.date, e.target.value),
        ]
      : [originalFormat(fullEndDate.date, e.target.value)]
    }else{
      setFullEndDate((prevState) => ({
        ...prevState,
        hour: formHour(new Date()),
      }))
    }
  };

  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      <div className="relative flex items-center justify-center w-full">
        <h1 className="my-4 text-center">Fechas</h1>
        <div
          onClick={() => setDateModal(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="w-full p-4">
        <div className="w-full">
          <div className="w-full bg-transparent aside__new__modal--section modal__section__dates--calendar">
            <ReactDatePicker
              locale="es"
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
          <div className="my-4">
            <p className="font-semibold text-[12px]">Fecha de inicio</p>
            <div className="w-[125px] my-1">
              <div className="flex items-center justify-center space-x-2">
                <input
                  className="w-[22px] h-[22px]"
                  checked={checkStartDate}
                  onChange={(e) => setCheckStartDate(e.target.checked)}
                  type="checkbox"
                  name=""
                  id=""
                />
                <input
                  type="text"
                  value={checkStartDate ? fullStartDate.date : ""}
                  onChange={(e) =>
                    setFullStartDate((prevState) => ({
                      ...prevState,
                      date: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    onchangeStartDate(e)
                  }
                  className={`w-full p-2 rounded-sm border-2  outline-none min-w-[105px] ${
                    checkStartDate
                      ? "bg-transparent border-[#3ba7ff]"
                      : "bg-gray-600 border-transparent cursor-not-allowed"
                  }`}
                  disabled={checkStartDate ? false : true}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
          </div>
          <div className="my-4">
            <p className="font-bold text-[#3ba7ff]  text-[12px]">
              Fecha de vencimiento
            </p>
            <div className="w-[230px] my-1">
              <div className="flex items-center justify-center space-x-2">
                <input
                  className="w-[45px] h-[24px]"
                  checked={checkEndDate}
                  onChange={(e) => setCheckEndDate(e.target.checked)}
                  type="checkbox"
                  name=""
                  id=""
                />
                <input
                  type="text"
                  value={checkEndDate ? fullEndDate.date : ""}
                  onChange={(e) =>
                    setFullEndDate((prevState) => ({
                      ...prevState,
                      date: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    onchangeEndDate(e)
                  }
                  className={`w-full p-2 rounded-sm border-2  outline-none min-w-[105px] ${
                    checkEndDate
                      ? "bg-transparent border-[#3ba7ff]"
                      : "bg-gray-600 border-transparent cursor-not-allowed"
                  }`}
                  disabled={checkEndDate ? false : true}
                  placeholder="dd/mm/yyyy"
                />
                <input
                  type="text"
                  value={checkEndDate ? fullEndDate.hour : ""}
                  onChange={(e) =>
                    setFullEndDate((prevState) => ({
                      ...prevState,
                      hour: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    onchangeEndDateHour(e)
                  }
                  className={`w-full p-2 rounded-sm border-2  outline-none ${
                    checkEndDate
                      ? "bg-transparent border-[#3ba7ff]"
                      : "bg-gray-600 border-transparent cursor-not-allowed"
                  }`}
                  disabled={checkEndDate ? false : true}
                  placeholder="HH:mm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleSaveDate}
              type="button"
              className="w-full bg-[#3ba7ff] text-[#1e1e1e] font-bold rounded-sm py-2"
            >
              Guardar
            </button>
            <button
              onClick={handleDeleteDate}
              type="button"
              className="w-full bg-[#515151] text-[#dfdfdf] font-bold rounded-sm py-2"
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
