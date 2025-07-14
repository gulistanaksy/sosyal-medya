import multer from "multer";
import stream from "stream";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import minioClient from "../../infrastructure/minioClient.js";

const prisma = new PrismaClient();

// Multer bellekte dosya tutacak
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images", 5); // en fazla 5 resim

const addPost = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: "Dosya yüklenemedi." });
    }

    try {
      const userId = req.userId;
      const { content } = req.body;

      const profile = await prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        return res.status(404).json({ error: "Profil bulunamadı." });
      }

      // POST oluştur (resimler sonra eklenecek)
      const newPost = await prisma.post.create({
        data: {
          content,
          profileId: profile.id,
        },
      });

      // Her resmi MinIO'ya yükle ve veritabanına kaydet
      const uploadedImages = [];

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileName = `post-${newPost.id}-${uuidv4()}.${file.originalname.split(".").pop()}`;
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);

        // MinIO'ya yükle
        await minioClient.putObject(
          "post-media",
          fileName,
          bufferStream,
          file.size,
          { "Content-Type": file.mimetype }
        );

        const imageUrl = `http://localhost:9000/post-media/${fileName}`;

        uploadedImages.push({
          url: imageUrl,
          order: i,
          postId: newPost.id,
        });
      }

      // PostImage kayıtlarını topluca oluştur
      await prisma.postImage.createMany({
        data: uploadedImages,
      });

      res.status(201).json({ message: "Post oluşturuldu", postId: newPost.id });
    } catch (error) {
      console.error("addPost error:", error);
      res.status(500).json({ error: "Bir hata oluştu." });
    }
  });
};

export default addPost;
