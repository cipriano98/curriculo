# Inicializando o projeto:

Para instalar as dependências
```
yarn
```

Para inicializar o servidor
```
yarn start
```

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
