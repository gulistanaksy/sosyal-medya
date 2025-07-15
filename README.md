# 🚀 Sosyal Medya Backend API

Sosyal medya uygulamaları için geliştirilen bu backend, temel işlevleri sağlayan RESTful bir servistir. Modüler yapısı ve SOLID prensiplerine uygun kodlamasıyla sürdürülebilir ve esnek bir mimariye sahiptir.

---
## 🛠️ Kullanılan Teknolojiler

- **Node.js** — JavaScript runtime ortamı  
- **Express.js** — RESTful API geliştirmek için web framework  
- **Prisma** — Type-safe ORM ile veritabanı yönetimi  
- **PostgreSQL** — İlişkisel veritabanı sistemi  
- **Docker** — Uygulama ve veritabanı konteynerizasyonu  
- **MinIO** — AWS S3 uyumlu obje depolama servisi (profil resimleri ve medya dosyaları için)  
- **JWT (JSON Web Token)** — Kullanıcı kimlik doğrulama  
- **bcrypt** — Şifrelerin güvenli şekilde hashlenmesi  


## ✨ Proje Özellikleri

- 📝 **Post Oluşturma:** Kullanıcılar, çoklu resim içeren paylaşımlar yapabilir ve bu gönderileri yönetebilir.
- ❤️ **Beğeni Sistemi:** Gönderiler beğenilebilir ve beğeni sayısı takip edilebilir.  
- 💬 **Yorum Yapma:** Her gönderiye yorum eklenebilir ve yorumlar yönetilebilir.  
- 👥 **Takip Sistemi:** Kullanıcılar diğer kullanıcıları takip edip takipçi listelerini görüntüleyebilir.  
- 🔐 **Güvenli Kimlik Doğrulama:** JWT ve bcrypt kullanılarak güvenlik sağlanır.
- 📁 **Medya Yönetimi:** Profil fotoğrafları ve gönderi dosyaları MinIO ile güvenli bir şekilde depolanır.  
- ⚙️ **RESTful API:** Modüler ve bakımı kolay, REST prensiplerine uygun tasarım.  
- 🔄 **Genişletilebilirlik:** SOLID prensiplerine uygun kod yapısı sayesinde kolayca yeni özellik eklenebilir.  


# 🚀 Sosyal Medya Backend API Kurulum Talimatları

1. Projeyi klonlayın ve proje dizinine gidin:
```sh
    git clone https://github.com/gulistanaksy/sosyal-medya.git
    cd sosyal-medya
```

2. Ana dizinde ".env" dosyası oluşturun ve içine    aşağıdaki satırları ekleyin:
- (DATABASE_URL içindeki "şifreniz" kısmını kendi PostgreSQL şifrenizle değiştirin)
```sh
    DATABASE_URL="postgresql://postgres:şifreniz@postgres/projeDB?schema=public&connection_limit=5&pool_timeout=2"
    JWT_SECRET="gizli_anahtarınızı_buraya_yazın"
```


3. Docker konteynerlerini başlatmak için aşağıdaki komutu çalıştırın:
```sh
docker compose -p projebackend up -d
```
- Bu komut aynı zamanda start.bat dosyasında da bulunmaktadır.
- İsterseniz start.bat dosyasını çalıştırarak da başlatabilirsiniz.

4. MinIO üzerinde social-media ve post-media adında iki ayrı bucket elle oluşturulmalıdır.

# API Endpointleri



## 🔐 Auth (Kimlik Doğrulama)

- **POST** `/register`  
  _Yeni kullanıcı kaydı oluşturur._

- **POST** `/login`  
  _Kullanıcı giriş yapar, JWT token alır._

---

## 👤 User

- **GET** `/user`  
  _Giriş yapan kullanıcı bilgilerini döner._

---

## 👥 Profile

- **GET** `/profile`  
  _Giriş yapan kullanıcının profilini getirir._

- **PUT** `/profile/update`  
  _Profil bilgilerini günceller._

- **POST** `/profile/upload-picture`  
  _Profil fotoğrafı yükler._

- **GET** `/profile/:id`  
  _Belirtilen kullanıcı profili._

- **GET** `/profile/:id/followers`  
  _Kullanıcının takipçilerini listeler._

- **GET** `/profile/:id/following`  
  _Kullanıcının takip ettiklerini listeler._

---

## 📝 Post

- **POST** `/post/add`  
  _Yeni gönderi oluşturur._

- **GET** `/post/:id`  
  _Belirtilen gönderiyi getirir._

- **PUT** `/post/update/:postId`  
  _Gönderiyi günceller._

---

## 💬 Comment

- **POST** `/comment/add`  
  _Gönderiye yeni yorum ekler._

- **PUT** `/comment/update/:id`  
  _Yorumu günceller._

- **DELETE** `/comment/delete/:id`  
  _Yorumu siler._

- **GET** `/comment/post/:postId`  
  _Gönderinin yorumlarını listeler._

---

## ❤️ Like

- **POST** `/like/toggle/:postId`  
  _Gönderi için beğeniyi ekler/kaldırır._

---

## 🤝 FollowRequest

- **POST** `/followRequest/add`  
  _Takip isteği gönderir._

- **PUT** `/followRequest/update`  
  _Takip isteği durumunu günceller._

- **GET** `/followRequest/`  
  _Kullanıcının takip isteklerini listeler._

- **DELETE** `/followRequest/cancel`  
  _Takip isteğini iptal eder._

- **DELETE** `/followRequest/unfollow`  
  _Takibi bırakır._

---
