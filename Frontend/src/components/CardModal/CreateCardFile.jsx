import PropTypes from "prop-types";
import close from "../../assets/icons/x.svg";
import { CreateCardFiles } from "../../services/project";

CreateFileComponent.propTypes = {
  myCard: PropTypes.object.isRequired,
  setCardFiles: PropTypes.func.isRequired,
  setCardFileModal: PropTypes.func.isRequired,
};

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function CreateFileComponent({
  myCard,
  setCardFiles,
  setCardFileModal,
}) {
  const handleSavefile = async (event) => {
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const formData = new FormData();
      formData.append("filename", file.name);
      formData.append("location", file);
      formData.append("card_id", myCard._id);
      const newCardFile = await CreateCardFiles(formData);
      setCardFiles((prevState) => [...prevState, newCardFile]);
      setCardFileModal(false);
    } else {
      console.error(
        "Invalid file type. Please select a valid file type: JPG, PNG, WEBP, PDF, TXT, DOCX, XLSX, or PPTX."
      );
    }
  };

  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      <div className="relative flex items-center justify-center">
        <h1 className="mt-4 mb-1 text-center">Adjuntar Archivos</h1>
        <div
          onClick={() => setCardFileModal(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="p-3">
        <p className="my-1 font-semibold">Adjunte un archivo de su ordenador</p>
        <input
          type="file"
          id="inputFile"
          className="hidden"
          onChange={(e) => handleSavefile(e)}
        />
        <label
          htmlFor="inputFile"
          className="block w-full px-4 py-2 mt-4 text-center text-white bg-blue-500 rounded-md cursor-pointer"
        >
          Seleccionar Archivo
        </label>
      </div>
    </div>
  );
}
