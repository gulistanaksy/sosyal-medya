import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProfileById = async (req, res) => {
  try {
    const profileId = Number(req.params.id);

    if (isNaN(profileId) || profileId <= 0) {
      return res.status(400).json({ error: "Geçersiz profil ID." });
    }

    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
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
        posts: {
          take:5,
          select: {
            id: true,
            content: true,
            createdAt: true,
            images: {
              take:1,
              select: {
                url: true,
                order: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profil bulunamadı." });
    }

    // Eğer profil gizliyse ve sorgulayan kişi sahibi değilse erişimi engelle
    if (profile.isPrivate && req.userId !== profile.userId) {
      return res.status(403).json({ error: "Bu profil gizlidir." });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("getProfileById error:", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

export default getProfileById;
