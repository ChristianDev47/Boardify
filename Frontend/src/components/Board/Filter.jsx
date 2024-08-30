import PropTypes from "prop-types";
import close from "../../assets/icons/x.svg";
import clock from "../../assets/icons/clock.svg";
import calendar from "../../assets/icons/calendar.svg";
import user from "../../assets/icons/user.svg";
import arrow from "../../assets/icons/arrowSelect.svg";
import selected from "../../assets/icons/selected.svg";
import { useState } from "react";
import { useFilters } from "../../hook/filter";
import { charValue } from "../../services/getInitialsUsers";

Filter.propTypes = {
  setShowFilter: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
};

export default function Filter({ setShowFilter, members, lists }) {
  const { filters, setFilters } = useFilters();
  const [showMembers, setShowMembers] = useState("h-0 py-0");
  const [showLists, setShowLists] = useState("h-0 py-0");

  const handleButtonClick = () => {
    setShowMembers((prevState) =>
      prevState === "h-0 py-0" ? "h-auto py-0" : "h-0 py-0"
    );
  };
  const handleButtonListClick = () => {
    setShowLists((prevState) =>
      prevState === "h-0 py-0" ? "h-auto py-0" : "h-0 py-0"
    );
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilter) => ({
      ...prevFilter,
      withoutMembers:
        name === "withoutMembers" ? checked : prevFilter.withoutMembers,
      selectedMembers:
        name === "selectedMembers"
          ? { check: checked, data: prevFilter.selectedMembers.data }
          : prevFilter.selectedMembers,
      withoutDate: name === "withoutDate" ? checked : prevFilter.withoutDate,
      due_this_week:
        name === "due_this_week" ? checked : prevFilter.due_this_week,
      due: name === "due" ? checked : prevFilter.due,
      completed: name === "completed" ? checked : prevFilter.completed,
      not_completed:
        name === "not_completed" ? checked : prevFilter.not_completed,
      selectedLists:
        name === "selectedLists"
          ? { check: checked, data: prevFilter.selectedLists.data }
          : prevFilter.selectedLists,
    }));
  };

  const handleAddFilterMember = (id) => {
    const exist = filters.selectedMembers.data.filter(
      (member) => member === id
    );
    if (exist.length === 0) {
      setFilters((prevFilter) => ({
        ...prevFilter,
        selectedMembers: {
          check: prevFilter.selectedMembers.check,
          data: [...prevFilter.selectedMembers.data, id],
        },
      }));
    } else {
      const newData = filters.selectedMembers.data.filter(
        (member) => member !== id
      );
      setFilters((prevFilter) => ({
        ...prevFilter,
        selectedMembers: {
          check: prevFilter.selectedMembers.check,
          data: newData,
        },
      }));
    }
  };

  const handleAddFilterList = (id) => {
    const exist = filters.selectedLists.data.filter((list) => list === id);
    if (exist.length === 0) {
      setFilters((prevFilter) => ({
        ...prevFilter,
        selectedLists: {
          check: prevFilter.selectedLists.check,
          data: [...prevFilter.selectedLists.data, id],
        },
      }));
    } else {
      const newData = filters.selectedLists.data.filter((list) => list !== id);
      setFilters((prevFilter) => ({
        ...prevFilter,
        selectedLists: { check: prevFilter.selectedLists.check, data: newData },
      }));
    }
  };

  return (
    <>
      <div className="absolute top-28 right-4 w-[350px] text-[14px] h-auto bg-[#1F2130] rounded-md shadow-2xl z-40">
        <div className="relative flex items-center justify-center border-b border-gray-50">
          <h1 className="my-4 font-bold text-center">Filtrar tabla</h1>
          <div
            onClick={() => setShowFilter(false)}
            className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-700"
          >
            {" "}
            <img className="w-[18px] h-auto" src={close} alt="" />
          </div>
        </div>
        <div className="p-2 space-y-3">
          <div className="space-y-2">
            <h3>Miembros</h3>
            <div>
              <div className="flex justify-start space-x-2">
                <input
                  type="checkbox"
                  name="withoutMembers"
                  id=""
                  checked={filters.withoutMembers}
                  onChange={handleCheckboxChange}
                />
                <img
                  className="w-[18px] h-[18px] bg-gray-700 aspect-square rounded-full"
                  src={user}
                  alt=""
                />
                <p>Sin miembros</p>
              </div>
              <div className="flex items-start justify-start w-full space-x-2">
                <div className="w-full bg-gray-700 border border-gray-700 rounded-lg dark:border-neutral-700 dark:bg-body-dark">
                  <h2>
                    <button
                      className="relative flex items-center w-full p-2 text-left text-gray-100 transition bg-gray-700 border-0 rounded-lg group text-[14px]"
                      onClick={handleButtonClick}
                    >
                      {filters.selectedMembers.data.length > 0
                        ? filters.selectedMembers.data.length +
                          " miembro/s seleccionados"
                        : "Seleccionar miembros"}
                      <span className="ms-auto  w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                        <img
                          className="w-[20px] rotate-180"
                          src={arrow}
                          alt="icon"
                        />
                      </span>
                    </button>
                  </h2>
                  <div
                    className={`w-full block overflow-hidden ${showMembers} transition-all ease-in-out duration-500 `}
                  >
                    <div className="px-1 ">
                      {members &&
                        members.map((member) => {
                          return (
                            <div
                              onClick={() => handleAddFilterMember(member.member_id.id)}
                              key={member.member_id.id}
                              className="flex items-center justify-between w-full p-1 my-1 rounded-sm cursor-pointer hover:bg-gray-700"
                            >
                              <div className="flex items-center justify-center gap-2">
                                {member.member_id && member.member_id.profile && member.member_id.profile !== "" ? (
                                  <div
                                    title={member.member_id.email}
                                    className={`relative cursor-pointer w-[35px] h-auto py-1 px-3 text-[12px] rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                                      !["png", "jpg", "webp"].includes(
                                        member.member_id.profile
                                          .split(".")
                                          .pop()
                                          .split("?")[0]
                                      )
                                        ? `bg-[#0065FF]`
                                        : `bg-cover bg-center`
                                    }`}
                                    style={
                                      member.member_id.profile.split(":")[0] == "https"
                                        ? {
                                            backgroundImage: `url(${member.member_id.profile})`,
                                          }
                                        : null
                                    }
                                  >
                                    {member.member_id.profile.split(":")[0] !== "https" &&
                                      charValue(member.member_id.name, member.member_id.surname)}
                                  </div>
                                ) : (
                                  member.member_id.name &&
                                  member.member_id.surname && (
                                    <div className=" w-[35px] h-[35px]  bg-[#0065FF]  text-[12px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                                      {charValue(member.member_id.name, member.member_id.surname)}
                                    </div>
                                  )
                                )}
                                <div className="flex flex-col text-[14px]">
                                  <p>
                                    <span className="font-bold">
                                      {member.member_id.name} {member.member_id.surname}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              {[...filters.selectedMembers.data].includes(
                                member.member_id.id
                              ) && (
                                <img
                                  className="w-[20px] "
                                  src={selected}
                                  alt=""
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3>Fecha de Vencimiento</h3>
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                name="withoutDate"
                id=""
                checked={filters.withoutDate}
                onChange={handleCheckboxChange}
              />
              <img
                className="w-[18px] h-auto bg-gray-700 aspect-square rounded-full p-0.5"
                src={calendar}
                alt=""
              />
              <p>Sin fecha de vencimiento</p>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                name="due_this_week"
                id=""
                checked={filters.due_this_week}
                onChange={handleCheckboxChange}
              />
              <img
                className="w-[18px] h-auto bg-gray-700 aspect-square rounded-full p-0.5"
                src={clock}
                alt=""
              />
              <p>Vencen esta semana</p>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                name="due"
                id=""
                checked={filters.due}
                onChange={handleCheckboxChange}
              />
              <img
                className="w-[18px] h-auto bg-gray-700 aspect-square rounded-full p-0.5"
                src={clock}
                alt=""
              />
              <p>Vencidas</p>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                name="completed"
                id=""
                checked={filters.completed}
                onChange={handleCheckboxChange}
              />
              <p>Marcadas como completadas</p>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                name="not_completed"
                id=""
                checked={filters.not_completed}
                onChange={handleCheckboxChange}
              />
              <p>Marcadas como no completadas</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3>Listas del tablero</h3>
            <div className="flex items-start justify-start w-full space-x-2">
              <div className="w-full bg-gray-700 border border-gray-700 rounded-lg dark:border-neutral-700 dark:bg-body-dark">
                <h2>
                  <button
                    className="relative flex items-center w-full p-2 text-base text-left text-gray-100 transition bg-gray-700 border-0 rounded-lg group "
                    onClick={handleButtonListClick}
                  >
                    {filters.selectedLists.data.length > 0
                      ? filters.selectedLists.data.length +
                        " lista/s seleccionadas"
                      : "Seleccionar listas"}
                    <span className="ms-auto  w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                      <img
                        className="w-[20px] rotate-180"
                        src={arrow}
                        alt="icon"
                      />
                    </span>
                  </button>
                </h2>
                <div
                  className={`w-full block overflow-hidden ${showLists} transition-all ease-in-out duration-500 `}
                >
                  <div>
                    {lists &&
                      lists.map((list) => {
                        return (
                          <div
                            onClick={() => handleAddFilterList(list._id)}
                            key={list._id}
                            className="flex items-center justify-between p-2 my-1 rounded-sm cursor-pointer hover:bg-gray-500"
                          >
                            <p>{list.name}</p>
                            {[...filters.selectedLists.data].includes(
                              list._id
                            ) && (
                              <img className="w-[20px]" src={selected} alt="" />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
