<h1 align="center">
my name app - NestJS + Prisma + Postgress
</h1>

<p align="center">my description app</p>

<p align="center">
  <a href="https://github.com/cipriano98/curriculo/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/rocketseat/youtube-challenge-nestjs-graphql?color=%237159c1&logoColor=%237159c1&style=flat" alt="Contributors">
  </a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <!-- <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a> -->
</p>

<hr>

## Participants

| [<img src="https://avatars2.githubusercontent.com/u/56701750?s=400&v=4" width="75px;"/>](https://github.com/cipriano98) |
| :------------------------------------------------------------------------------------------------------------------------: |


| [Natan Cipriano](https://github.com/cipriano98)

<br>
<br>

# Getting started
## To install the dependencies
```bash
yarn
```

## To boot the server
```bash
yarn start # to start in production mode
#  OR
yarn ts-dev # to start in development mode

```

## If you don't have yarn installed:
```
npm install -g yarn
```

# Prisma:

## To save changes to the database (./prisma/schema.prisma) 
```bash
yarn save
# OR
npx prisma migrate save --name nameOfYourMigrate --experimental
```

## To apply changes
```bash
yarn up
```

## To generate the interfaces from the changes made
```bash
yarn generate
```

## To have access to a graphical interface of your database
```bash
yarn studio
```

## Shortcuts:
```bash
# yarn save && yarn up && yarn generate
yarn prisma
```
