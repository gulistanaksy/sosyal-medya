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
        user: {
          select: {
            username: true,
            fullName: true,
          },
        },
        posts: {
          orderBy: { createdAt: "desc" },
          take: 5, // Son 5 post
          select: {
            id: true,
            content: true,
            createdAt: true,
            images: {
              select: {
                url: true,
                order: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
        },
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
