#!/bin/bash
set -e

echo -e "\e[1;33mdatabase upgrading...\e[0m"
npx prisma generate
npx prisma migrate dev --name init
echo -e "\e[0;32mdatabase upgraded.\e[0m\n\n"


echo -e "\e[1;33mprisma studio starting...\e[0m"
npx prisma studio --port 8055 &
echo -e "\e[0;32mprisma studio started.\e[0m\n\n" &


echo -e "\e[1;33mnodejs server starting...\e[0m" &
npm run dev
# echo -e "\e[0;32nodejs server started.\e[0m\n\n"