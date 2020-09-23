# Inicializando o projeto:
Execute:
```
yarn
```
para instalar as dependências e
```
yarn start
```
para inicializar o servidor

## caso não possua o yarn instalado:
```
npm install -g yarn
```
# Prisma:
Para salvar as alterações do banco (./prisma/schema.prisma) 
```
yarn save
# ou
npx prisma migrate save --name nomeDaSuaMigrate --experimental
```

Para aplicar as alterações 
```
yarn up
```

Para gerar o banco a partir das alterações realizadas 
```
yarn generate
```

Para ter acesso a uma interface do seu banco
```
yarn studio
```
