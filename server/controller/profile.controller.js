import { User } from "../models/User.modal.js";
import dotenv from "dotenv";
dotenv.config();

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { secretKey, role } = req.body;
  console.log(req.body);

  const expectedSecretKey = process.env.ADMIN_SECRET_KEY;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "UserId not found", data: null, success: false });
  }

  if (role === "admin" && secretKey !== expectedSecretKey) {
    return res
      .status(403)
      .json({ message: "Invalid secret key", data: null, success: false });
  }

  try {
    const updateProfile = await User.findOneAndUpdate(
      { _id: userId },
      { role: role },
      { new: true }
    );

    if (!updateProfile) {
      return res
        .status(404)
        .json({ message: "User not found", data: null, success: false });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updateProfile,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      error: err.message,
    });
  }
};
