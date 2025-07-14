import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = Number(req.params.postId);
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Geçerli bir içerik girin." });
    }

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        profile: {
          userId: userId, // sadece kendi postunu güncelleyebilir
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post bulunamadı veya size ait değil." });
    }

    const updated = await prisma.post.update({
      where: { id: postId },
      data: { content },
    });

    res.status(200).json({ message: "Post güncellendi.", post: updated });
  } catch (error) {
    console.error("updatePost error:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
};

export default updatePost;
