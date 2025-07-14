import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addFollowRequest = async (req, res) => {
  try {
    const senderUserId = req.userId;
    const { receiverProfileId } = req.body;

    // Gönderenin profili
    const senderProfile = await prisma.profile.findUnique({
      where: { userId: senderUserId },
    });

    if (!senderProfile) {
      return res.status(404).json({ error: "Gönderen profili bulunamadı." });
    }

    if (senderProfile.id === receiverProfileId) {
      return res.status(400).json({ error: "Kendi profilinize istek atamazsınız." });
    }

    // Alıcının profili kontrolü
    const receiverProfile = await prisma.profile.findUnique({
      where: { id: receiverProfileId },
    });

    if (!receiverProfile) {
      return res.status(404).json({ error: "Alıcı profili bulunamadı." });
    }

    // Zaten istek var mı?
    const existingRequest = await prisma.followRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: senderProfile.id,
          receiverId: receiverProfile.id,
        },
      },
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Zaten bir istek gönderilmiş." });
    }

    const newRequest = await prisma.followRequest.create({
      data: {
        senderId: senderProfile.id,
        receiverId: receiverProfile.id,
      },
    });

    res.status(201).json({ message: "Takip isteği gönderildi.", request: newRequest });
  } catch (error) {
    console.error("addFollowRequest error:", error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};

export default addFollowRequest;
