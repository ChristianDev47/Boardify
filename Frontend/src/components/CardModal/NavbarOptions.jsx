import PropTypes from "prop-types";
import membersIcon from "../../assets/icons/user.svg";
import portada from "../../assets/icons/portada.svg";
import label from "../../assets/icons/label.svg";
import checkItem from "../../assets/icons/checkItem.svg";
import clock from "../../assets/icons/clock.svg";
import file from "../../assets/icons/file.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import CreateLabelComponent from "./CreateLabel";
import CreateCheckItemComponent from "./CreateCheckItem";
import CreateDateComponent from "./CreateDate";
import CreateFileComponent from "./CreateCardFile";
import CreatePortadaComponent from "./Portada";
import MembersComponent from "./Members";
import { useState } from "react";
import CardDelete from "./DeleteCard";

NavbarOptions.propTypes = {
  handleNewLabel: PropTypes.func.isRequired,
  modalLabel: PropTypes.bool.isRequired,
  setModalLabel: PropTypes.func.isRequired,
  setMyLabel: PropTypes.func.isRequired,
  setLabels: PropTypes.func.isRequired,
  setMyCard: PropTypes.func.isRequired,
  myLabel: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  myCard: PropTypes.object.isRequired,
  setCheckItems: PropTypes.func.isRequired,
  editModal: PropTypes.bool.isRequired,
  checklistModal: PropTypes.bool.isRequired,
  setCheckListModal: PropTypes.func.isRequired,
  dateModal: PropTypes.bool.isRequired,
  setDateModal: PropTypes.func.isRequired,
  setCardFiles: PropTypes.func.isRequired,
  setCardFileModal: PropTypes.func.isRequired,
  cardFileModal: PropTypes.bool.isRequired,
  setBackgroundModal: PropTypes.func.isRequired,
  backgroundModal: PropTypes.bool.isRequired,
  cardFiles: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  setMembersModal: PropTypes.func.isRequired,
  membersModal: PropTypes.bool.isRequired,
  cardMembers: PropTypes.array.isRequired,
  setCardMembers: PropTypes.func.isRequired,
  setMembers: PropTypes.func.isRequired,
};

export default function NavbarOptions({
  handleNewLabel,
  modalLabel,
  setModalLabel,
  setMyLabel,
  setLabels,
  myLabel,
  myCard,
  setMyCard,
  editModal,
  labels,
  setCheckItems,
  checklistModal,
  setCheckListModal,
  dateModal,
  setDateModal,
  setCardFiles,
  cardFileModal,
  setCardFileModal,
  setBackgroundModal,
  backgroundModal,
  cardFiles,
  members,
  membersModal,
  setMembersModal,
  cardMembers,
  setCardMembers,
  setMembers,
}) {
  const [showCardDelete, setShowCardDelete] = useState(false);
  return (
    <div className="relative text-[14px] ml-4 col-span-2 mb-[5rem] sm:mb-[5rem] md:col-span-7 md:mx-10 md:mt-4 sm:col-span-7 sm:mx-10 sm:mt-4">
      <h3 className="my-2">Añadir a la tarjeta</h3>
      <div className="flex flex-col items-start space-y-2 md:flex-row md:flex-wrap md:justify-start sm:flex-row sm:flex-wrap sm:justify-start ">
        <button
          onClick={() => setMembersModal(true)}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={membersIcon} alt="" />
          Miembros
        </button>
        <button
          onClick={() => handleNewLabel()}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={label} alt="" />
          Etiquetas
        </button>
        <button
          onClick={() => setCheckListModal(true)}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={checkItem} alt="" />
          Checklist
        </button>
        <button
          onClick={() => setDateModal(true)}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={clock} alt="" />
          Fechas
        </button>
        <button
          onClick={() => setCardFileModal(true)}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={file} alt="" />
          Archivos
        </button>
        <button
          onClick={() => setBackgroundModal(true)}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={portada} alt="" />
          Portada
        </button>
        <button
          onClick={() => setShowCardDelete(true)}
          className="flex items-center justify-start w-full md:w-[21%] md:min-w-[100px]  sm:mr-2 sm:w-[21%] sm:min-w-[100px] md:mr-2  p-2 bg-gray-600 rounded-sm hover:bg-gray-500"
        >
          <img className="w-[15px] h-auto mr-2" src={deleteIcon} alt="" />
          Eliminar
        </button>
      </div>
      {modalLabel && (
        <CreateLabelComponent
          setModalLabel={setModalLabel}
          setMyLabel={setMyLabel}
          setLabels={setLabels}
          myLabel={myLabel}
          labels={labels}
          myCard={myCard}
          editModal={editModal}
        />
      )}
      {checklistModal && (
        <CreateCheckItemComponent
          setCheckListModal={setCheckListModal}
          setCheckItems={setCheckItems}
          myCard={myCard}
        />
      )}
      {dateModal && (
        <CreateDateComponent
          myCard={myCard}
          setMyCard={setMyCard}
          setDateModal={setDateModal}
          dateModal={dateModal}
        />
      )}
      {cardFileModal && (
        <CreateFileComponent
          myCard={myCard}
          setCardFiles={setCardFiles}
          setCardFileModal={setCardFileModal}
        />
      )}
      {backgroundModal && (
        <CreatePortadaComponent
          myCard={myCard}
          cardFiles={cardFiles}
          setCardFiles={setCardFiles}
          setMyCard={setMyCard}
          setBackgroundModal={setBackgroundModal}
        />
      )}
      {membersModal && (
        <MembersComponent
          myCard={myCard}
          setMemberModal={setMembersModal}
          members={members}
          setCardMembers={setCardMembers}
          cardMembers={cardMembers}
          setMembers={setMembers}
        />
      )}
      {showCardDelete && (
        <CardDelete
          setShowModalCard={setShowCardDelete}
          myCard={myCard}
        />
      )}
    </div>
  );
}
