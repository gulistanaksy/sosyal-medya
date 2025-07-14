import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, content } = req.body;

    if (!content || !postId) {
      return res.status(400).json({ error: "Yorum içeriği ve post ID zorunludur." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Kullanıcı profili bulunamadı." });
    }

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post bulunamadı." });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: post.id,
        profileId: profile.id,
      },
    });

    res.status(201).json({ message: "Yorum başarıyla eklendi.", comment: newComment });
  } catch (error) {
    console.error("addComment error:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
};

export default addComment;
