## Proje Başlatma Talimatları
Projeyi başlatmadan önce ana dizinde .env dosyasını oluşturmanız gerekli. .env doya içerisinde DATABASE_URL tanımlamasını aşağıdaki gibi yapın. Şifreniz alanını silerek postgre şifrenizi yazın.
```sh
DATABASE_URL="postgresql://postgres:şifreniz@postgres/projeDB?schema=public&connection_limit=5&pool_timeout=2"
```

