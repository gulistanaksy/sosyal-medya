import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateComment = async (req, res) => {
  try {
    const userId = req.userId;
    const commentId = Number(req.params.id);
    const { content } = req.body;

    if (!content || !commentId) {
      return res.status(400).json({ error: "Yorum içeriği ve yorum ID zorunludur." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Kullanıcı profili bulunamadı." });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Yorum bulunamadı." });
    }

    if (comment.profileId !== profile.id) {
      return res.status(403).json({ error: "Bu yorumu güncelleme yetkiniz yok." });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.status(200).json({ message: "Yorum güncellendi.", comment: updatedComment });
  } catch (error) {
    console.error("updateComment error:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
};

export default updateComment;
