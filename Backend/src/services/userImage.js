import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects/boardify/profileImages",
    format: async (req, file) => {
      "jpg", "png", "jpeg", "webp";
    },
    public_id: (req, file) => `bg_${Date.now()}`,
  },
});

export const uploadProfileImage = multer({ storage: storage });

export const deleteOldProfileImage = async (user) => {
  if (user.location && user.location.includes("cloudinary.com")) {
    const publicId = user.location.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/boardify/profileImages/${publicId}`
    );
  }
};

export const deleteOldProfileImageUser = async (user) => {
  if (user.profile && user.profile.includes("cloudinary.com")) {
    const publicId = user.profile.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/boardify/profileImages/${publicId}`
    );
  }
};
