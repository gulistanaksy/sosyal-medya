import { PrismaClient, FollowRequestStatus } from "@prisma/client";
const prisma = new PrismaClient();

const cancelFollowRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { receiverId } = req.body;

    const sender = await prisma.profile.findUnique({ where: { userId } });

    if (!sender) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }

    const followRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: sender.id,
        receiverId,
        status: FollowRequestStatus.PENDING,
      },
    });

    if (!followRequest) {
      return res.status(404).json({ error: "İptal edilecek bir istek bulunamadı." });
    }

    await prisma.followRequest.delete({
      where: { id: followRequest.id },
    });

    res.status(200).json({ message: "Takip isteği iptal edildi." });
  } catch (error) {
    console.error("cancelFollowRequest error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default cancelFollowRequest;
