import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Middleware'den geliyor

    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
      select: {
        id: true,
        bio: true,
        profilePicture: true,
        isPrivate: true,
        userId: true,
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
          },
        },
        posts: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profil bulunamadı." });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("getProfile error:", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

export default getProfile;
