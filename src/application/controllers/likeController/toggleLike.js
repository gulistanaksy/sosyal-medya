import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const toggleLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = Number(req.params.postId);

    if (isNaN(postId) || postId <= 0) {
      return res.status(400).json({ error: "Geçersiz post ID." });
    }

    // Profil ID'sini al
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }

    // Daha önce beğenmiş mi kontrol et
    const existingLike = await prisma.like.findUnique({
      where: {
        profileId_postId: {
          profileId: profile.id,
          postId,
        },
      },
    });

    if (existingLike) {
      // Beğeni varsa kaldır
      await prisma.like.delete({
        where: {
          profileId_postId: {
            profileId: profile.id,
            postId,
          },
        },
      });
      return res.status(200).json({ message: "Beğeni kaldırıldı." });
    } else {
      // Beğeni yoksa ekle
      await prisma.like.create({
        data: {
          profileId: profile.id,
          postId,
        },
      });
      return res.status(201).json({ message: "Beğeni eklendi." });
    }
  } catch (error) {
    console.error("toggleLike error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default toggleLike;
