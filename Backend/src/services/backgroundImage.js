import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects/boardify/board/backgroundImage",
    format: async (req, file) => {
      "jpg", "png", "jpeg", "webp";
    },
    public_id: (req, file) => `bg_${Date.now()}`,
  },
});

export const uploadBackgroundImage = multer({ storage: storage });

export const deleteOldBackgroundImage = async (board) => {
  if (board.location && board.location.includes("cloudinary.com")) {
    const publicId = board.location.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/boardify/board/backgroundImage/${publicId}`
    );
  }
};
export const deleteOldBoardBackgroundImage = async (board) => {
  if (board.background && board.background.includes("cloudinary.com")) {
    const publicId = board.background.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/boardify/board/backgroundImage/${publicId}`
    );
  }
};
