import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPostById = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    if (isNaN(postId) || postId <= 0) {
      return res.status(400).json({ error: "Geçersiz post ID." });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            id: true,
            profilePicture: true,
            isPrivate: true,
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
              },
            },
          },
        },
        images: {
          select: {
            url: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post bulunamadı." });
    }

    const isOwner = req.userId === post.profile.user.id;
    if (post.profile.isPrivate && !isOwner) {
      return res.status(403).json({ error: "Bu post gizlidir." });
    }

    res.status(200).json({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      profile: post.profile,
      images: post.images,
      likeCount: post._count.likes,
      commentCount: post._count.comments,
    });
  } catch (error) {
    console.error("getPostById error:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
};

export default getPostById;
