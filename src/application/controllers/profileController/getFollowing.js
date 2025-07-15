import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getFollowing = async (req, res) => {
  try {
    const profileId = Number(req.params.id);

    if (isNaN(profileId) || profileId <= 0) {
      return res.status(400).json({ error: "Geçersiz profil ID." });
    }

    // Doğrudan Follow tablosunda followerId = profileId olan kayıtları çekelim
    const followingRelations = await prisma.follow.findMany({
      where: { followerId: profileId },
      include: {
        following: {
          select: {
            id: true,
            bio: true,
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

    // Sadece takip edilen profilleri listele
    const followingList = followingRelations.map(fr => ({
      id: fr.following.id,
      bio: fr.following.bio,
      profilePicture: fr.following.profilePicture,
      user: fr.following.user,
      followedAt: fr.createdAt,
    }));

    res.status(200).json({ following: followingList });
  } catch (error) {
    console.error("getFollowing error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
};


export default getFollowing