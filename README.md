# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

docker run -itd -e POSTGRES_USER=phil -e POSTGRES_PASSWORD=phil -p 5432:5432 --name postgresql postgres

pnpm prisma generate && pnpm prisma migrate dev --name button_clicked
