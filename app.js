import express from "express";
import router from "./src/application/routers/index.js";  // .js uzantısına dikkat!
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(router);

// Veritabanı bağlantısı ve sunucu başlatma fonksiyonu
const connectToDbAndStartServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database bağlantısı başarılı.");

    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor.`);
    });
  } catch (error) {
    console.error("Veritabanı bağlantısında hata oluştu:", error);
  }
};

// Prisma query logları
prisma.$on("query", (e) => {
  console.log("Query:", e.query);
  console.log("Params:", e.params);
  console.log("QueryDuration:", e.duration + "ms");
});

// Bağlantıyı başlat
connectToDbAndStartServer();
