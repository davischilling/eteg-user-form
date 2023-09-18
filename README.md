# John Doe Form

## Setup
- Instalar as dependências do server com `npm install`
- Instalar as dependências do client com `cd client && npm install`
- Levantar o banco de dados com o comando `docker-compose up -d`
- Executar o comando `npm run migrate` para criar as tabelas no banco de dados
- Executar o comando `npm run dev` para iniciar a aplicação
- Executar o comando `npm run test:cov` para visualizar a cobertura de testes

## RFs (Requisitos Funcionais)

- [X] RF1: O sistema deve permitir que o usuário se cadastre (Nome completo, CPF, e-mail, cor
preferida (entre as cores disponíveis em um arco-íris) e observações.)
- [X] RF2: O sistema deve notificar o usuário caso o cadastro tenha sido realizado com sucesso.

## RNs (Requisitos de Negócio)

- [X] RN1: O sistema não deve permitir que o usuário se cadastre CPF e e-mail já cadastrados. 

## RNFs (Requisitos Não Funcionais)

- [X] RNF1: Os dados da aplicação precisam estar armazenados em um banco de dados PostgreSQL.
- [X] RNF2: O sistema deve ultilizar Docker para facilitar a execução da aplicação.