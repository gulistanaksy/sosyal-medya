import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateProfile = async (req, res) => {
  try {
    console.log("updateProfile");

    const userId = req.userId;
    const { bio, profilePicture, isPrivate } = req.body;

    // Sadece gönderilen alanları toplayalım
    const dataToUpdate = {};
    if (bio !== undefined) dataToUpdate.bio = bio;
    if (profilePicture !== undefined) dataToUpdate.profilePicture = profilePicture;
    if (isPrivate !== undefined) dataToUpdate.isPrivate = isPrivate;

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ error: "Güncellenecek veri bulunamadı." });
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        userId: Number(userId),
      },
      data: dataToUpdate,
    });

    res.status(200).json({ profile: updatedProfile });
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

export default updateProfile;
