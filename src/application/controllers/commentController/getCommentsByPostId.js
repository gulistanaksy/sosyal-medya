import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCommentsByPostId = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    if (isNaN(postId) || postId <= 0) {
      return res.status(400).json({ error: "Geçersiz post ID." });
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            profilePicture: true,
            user: {
              select: {
                username: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("getCommentsByPostId error:", error);
    res.status(500).json({ error: "Yorumlar alınamadı." });
  }
};

export default getCommentsByPostId;
