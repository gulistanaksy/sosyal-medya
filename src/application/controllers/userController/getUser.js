import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  try {
    console.log("getuser");
    
    const userId = req.userId; // middleware'de tanımlanmış ve token'dan doğrulanmış ID
    console.log("getuser  ",userId);
    
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("getUser error:", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

export default getUser;
