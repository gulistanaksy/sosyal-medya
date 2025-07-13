import jwt from "jsonwebtoken";

// Ortam değişkeninden JWT secret al
const JWT_SECRET = process.env.JWT_SECRET;

const decryptToken = async (token) => {
  try {
    console.log("Token açma işlemi");
    console.log(token);

    // Token'i doğrulayıp çöz
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded", decoded);

    // Token'dan kullanıcı ID'si çıkar
    const userId = decoded.userId;

    return userId;
  } catch (error) {
    console.error("Token çözme hatası:", error);
    throw new Error("Geçersiz veya süresi dolmuş token");
  }
};

export default decryptToken;
