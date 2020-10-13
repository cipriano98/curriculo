<!-- <style>
    .center {
        text-align: center;
        padding-bottom: 20px;
        padding-top: 5px;
    }

    hr.description {
        width: 50%
    }
</style> -->


<div align="center">
<h1>
    Currículo Único - NestJS + Prisma + Postgress
</h1>


<h3>
    My new Description app
</h3>
<hr  width="50%">
<br>

<a href="https://github.com/cipriano98/curriculo/graphs/contributors">
<img title="Versão da aplicação" alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/cipriano98/curriculo">
</a>

<a href="https://github.com/cipriano98/curriculo/graphs/contributors">
<img alt="GitHub package.json dependency version (dev dep on branch)" src="https://img.shields.io/github/package-json/dependency-version/cipriano98/curriculo/dev/@nestjs/cli">
</a>

<a href="https://github.com/cipriano98/curriculo/graphs/contributors">
<img alt="GitHub package.json dependency version (dev dep on branch)" src="https://img.shields.io/github/package-json/dependency-version/cipriano98/curriculo/dev/@prisma/cli">
</a>

<a href="https://github.com/cipriano98/curriculo/graphs/contributors">
<img title="Contributors" src="https://img.shields.io/github/contributors/rocketseat/youtube-challenge-nestjs-graphql?color=%237159c1&logoColor=%237159c1&style=flat" alt="">
</a>

<a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/cipriano98/curriculo" alt="Package License"/>
</a>

<img title="coverage documentation" src="https://raw.githubusercontent.com/cipriano98/curriculo/8e1e56caf1862073291cf8fccd3aa8d2d840f66f/documentation/images/coverage-badge-documentation.svg" alt="coverage documentation"/>

<!-- <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a> -->

<img title="Most used language" src="https://img.shields.io/github/languages/top/cipriano98/curriculo" alt="Most used language">

<a href="https://insomnia.rest/run/?uri=https%3A%2F%2Fraw.githubusercontent.com%2Fcipriano98%2Fcurriculo%2Fmaster%2Finsominia.json" target="_blank">
      <img title="Run in Insomnia" src="https://img.shields.io/badge/Run%20in%20Insomnia-Rest-blueviolet" alt="Run in Insomnia">
  </a>
    
</div>
<br>

## Participants

| [<img src="https://avatars2.githubusercontent.com/u/56701750?s=400&v=4" width="75px;"/>](https://github.com/cipriano98) |
| :---------------------------------------------------------------------------------------------------------------------: |


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
