import { PrismaClient, FollowRequestStatus } from "@prisma/client";
const prisma = new PrismaClient();

const getFollowRequest = async (req, res) => {
  try {
    const userId = req.userId;

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }

    const [sent, received] = await Promise.all([
      prisma.followRequest.findMany({
        where: {
          senderId: profile.id,
          status: FollowRequestStatus.PENDING,
        },
        include: {
          receiver: {
            include: {
              user: { select: { id: true, username: true, fullName: true } },
            },
          },
        },
      }),
      prisma.followRequest.findMany({
        where: {
          receiverId: profile.id,
          status: FollowRequestStatus.PENDING,
        },
        include: {
          sender: {
            include: {
              user: { select: { id: true, username: true, fullName: true } },
            },
          },
        },
      }),
    ]);

    res.status(200).json({ sent, received });
  } catch (error) {
    console.error("getFollowRequest error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default getFollowRequest;
