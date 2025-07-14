import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getMyPostById = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = Number(req.params.id);

    if (isNaN(postId) || postId <= 0) {
      return res.status(400).json({ error: "Geçersiz post ID." });
    }

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        profile: {
          userId: userId,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        images: {
          select: {
            url: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post bulunamadı veya bu post size ait değil." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("getMyPostById error:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
};

export default getMyPostById;
