import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getFollowers = async (req, res) => {
  try {
    const profileId = Number(req.params.id);

    if (isNaN(profileId)) {
      return res.status(400).json({ error: "Geçersiz profil ID." });
    }

    const followers = await prisma.follow.findMany({
      where: {
        followingId: profileId,
      },
      include: {
        follower: {
          select: {
            id: true,
            profilePicture: true,
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    const formatted = followers.map(f => ({
      id: f.follower.id,
      profilePicture: f.follower.profilePicture,
      user: f.follower.user,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("getFollowers error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};

export default getFollowers;
