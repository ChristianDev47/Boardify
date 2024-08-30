import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects/boardify/card/backgroundImage",
    format: async (req, file) => {
      "jpg", "png", "jpeg", "webp";
    },
    public_id: (req, file) => `bg_${Date.now()}`,
  },
});

export const uploadCardBackgroundImage = multer({ storage: storage });

export const deleteOldCardBackgroundImage = async (card) => {
  if (card.background && card.background.includes("cloudinary.com")) {
    const publicId = card.background.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/boardify/card/backgroundImage/${publicId}`
    );
  }
};
