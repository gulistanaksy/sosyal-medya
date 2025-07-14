import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteComment = async (req, res) => {
  try {
    const userId = req.userId;
    const commentId = Number(req.params.id);

    if (!commentId) {
      return res.status(400).json({ error: "Geçersiz yorum ID." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Kullanıcı profili bulunamadı." });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Yorum bulunamadı." });
    }

    const isCommentOwner = comment.profileId === profile.id;
    const isPostOwner = comment.post.profileId === profile.id;

    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).json({ error: "Yorumu silme yetkiniz yok." });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Yorum silindi." });
  } catch (error) {
    console.error("deleteComment error:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
};

export default deleteComment;
