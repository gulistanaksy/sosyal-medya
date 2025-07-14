import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const unfollow = async (req, res) => {
  try {
    const userId = req.userId;
    const { followingId } = req.body;

    const follower = await prisma.profile.findUnique({ where: { userId } });

    if (!follower) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }

    const followRecord = await prisma.follow.findFirst({
      where: {
        followerId: follower.id,
        followingId,
      },
    });

    if (!followRecord) {
      return res.status(404).json({ error: "Takip ilişkisi bulunamadı." });
    }

    await prisma.follow.delete({
      where: { id: followRecord.id },
    });

    res.status(200).json({ message: "Takipten çıkıldı." });
  } catch (error) {
    console.error("unfollow error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default unfollow;
