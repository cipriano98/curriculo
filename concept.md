<h1 align="center">
Currículo Único - NestJS + prisma + Postgres
</h1>

Este trabalho consiste no desenvolvimento dos serviços Web (Web Services RESTful) com persistência da nossa aplicação Web. O objetivo deste trabalho é permitir os alunos aplicarem os conceitos e funcionalidades do REST e dos padrões de persistência vistos em aula (PDO e DAO). Nesse trabalho, a ideia é realizar o back-end do trabalho para futuramente unificar com o front-end.

Instruções gerais:

O trabalho possui um tema livre com algumas restrições quanto às funcionalidades, ou seja, o(s) aluno(s) poderá(ão) trabalhar com um domínio de aplicação de seu interesse. 

Com base nessa especificação, o(s) aluno(s) (um ou dois alunos) deverá(ão) desenvolver o back-end da aplicação. Para isso, todos os Web Services devem ser implementados e testados - utilizando a ferramenta Postman (vista em aula). Os Web Services deverão contemplar pelo menos três CRUD de entidades e uma funcionalidade específica, e essas funcionalidades deverão persistir seus dados em um banco de dados utilizando padrões adequados de mercado (no caso de PHP, utilizar PDO, por exemplo).

Caso o aluno não tenha ideia de trabalho, o aluno deverá realizar a aplicação biblioteca descrito no anexo do Escopo do Trabalho (abaixo). Nesse caso, o trabalho deverá ser realizado individualmente.

A aplicação desenvolvida deverá contemplar alguns assuntos vistos em aula. Assim, a avaliação será baseada de acordo com as funcionalidades a serem desenvolvidas e com os conceitos de REST e PDO (vistos em aula) empregados para o desenvolvimento dessa aplicação.

Avaliação

O conceito desse trabalho será baseado de acordo com as funcionalidades realizadas no trabalho e com os conceitos de Web Services RESTful empregados no trabalho. Abaixo segue a relação de conceitos e features a serem realizadas no trabalho:

## Conceito C:

- [ ] Dois Web Services RESTful realizando CRUD funcionando de forma correta com persistência

- #### para o professor
- [ ] Apresentação de forma clara;
  
- [ ] Testes dos Web Services corretamente (Insomnia);
  

## Conceito B:

- [ ] Realizar as tarefas para alcançar o conceito C;

- [ ] Realizar uma funcionalidade de negócio (ou CRUD) que manipule duas entidades simultaneamente na aplicação como um todo (utilizando Web Services de forma correta e adequada);

- [ ] Utilizar autenticação aplicando técnicas de segurança adequadamente (OAuth e JWT);

- [x] Utilização de um sistema de controle de versão (ex: git) e de um ambiente de colaboração e gerenciamento de código baseado nesse controle de versão (ex: GitHub, Bitbucket);

- [ ] Modelagem apropriada dos Web Services (retorno dos status code correto);

- [x] Aplicação dos conceitos de Orientação a Objetos corretamente.

## Conceito A:

- [ ] Aplicação completa, realizando todas as funcionalidades do conceito B com regras de negócio aplicadas corretamente;

- [ ] Tratamento de erros, regras de negócio e exceções;

- [ ] Implantar os Web Services em um servidor na nuvem: Heroku, Digital Ocean, etc.