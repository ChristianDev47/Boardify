import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Definimos los tipos MIME permitidos
const MIMETYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects/boardify/cardfiles",
    public_id: (req, file) => `file_${Date.now()}`,
  },
});

const fileFilter = (req, file, cb) => {
  if (MIMETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no soportado"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const deleteOldFiles = async (card) => {
  if (card.location && card.location.includes("cloudinary.com")) {
    const publicId = card.location.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/boardify/cardfiles/${publicId}`
    );
  }
};
