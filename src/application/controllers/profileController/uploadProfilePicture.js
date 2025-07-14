import multer from "multer";
import minioClient from "../../infrastructure/minioClient.js";
import { v4 as uuidv4 } from "uuid";
import stream from "stream";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Multer konfigürasyonu (bellekte tutacak)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("profilePicture");

const uploadProfilePicture = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: "Dosya yüklenemedi." });
    }

    try {
      const userId = req.userId; // Token doğrulama middleware'den

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Dosya bulunamadı." });
      }

      // Mevcut profil fotoğrafını al
      const existingProfile = await prisma.profile.findUnique({
        where: { userId },
        select: { profilePicture: true },
      });

      // Eğer eski profil fotoğrafı varsa sil
      if (existingProfile?.profilePicture) {
        const urlParts = existingProfile.profilePicture.split("/");
        const oldFileName = urlParts[urlParts.length - 1];

        try {
          await minioClient.removeObject("social-media", oldFileName);
          console.log(`Eski profil fotoğrafı silindi: ${oldFileName}`);
        } catch (removeErr) {
          console.warn("Eski dosya silinirken hata:", removeErr);
        }
      }

      // Yeni dosya adı oluştur
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `profile-${userId}-${uuidv4()}.${fileExtension}`;

      // Buffer stream oluştur
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      // Yeni dosyayı MinIO’ya yükle
      await minioClient.putObject(
        "social-media",
        fileName,
        bufferStream,
        file.size,
        {
          "Content-Type": file.mimetype,
        }
      );

      const imageUrl = `http://localhost:9000/profile-media/${fileName}`;

      // Profil kaydını güncelle
      await prisma.profile.update({
        where: { userId },
        data: { profilePicture: imageUrl },
      });

      res.status(200).json({ message: "Fotoğraf yüklendi", url: imageUrl });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Bir hata oluştu." });
    }
  });
};

export default uploadProfilePicture;
