import { PrismaClient, FollowRequestStatus } from "@prisma/client";
const prisma = new PrismaClient();

const updateFollowRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { requestId, status } = req.body;

    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return res.status(400).json({ error: "Geçersiz durum." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }

    const request = await prisma.followRequest.findUnique({
      where: { id: requestId },
    });

    if (!request || request.receiverId !== profile.id) {
      return res.status(404).json({ error: "İstek bulunamadı veya size ait değil." });
    }

    const updatedRequest = await prisma.followRequest.update({
      where: { id: requestId },
      data: { status },
    });

    // Kabul edilirse, Follow ilişkisi oluştur
    if (status === "ACCEPTED") {
      await prisma.follow.create({
        data: {
          followerId: request.senderId,
          followingId: request.receiverId,
        },
      });
    }

    res.status(200).json({ message: "İstek güncellendi.", request: updatedRequest });
  } catch (error) {
    console.error("updateFollowRequest error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default updateFollowRequest;
