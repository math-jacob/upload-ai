# Segunda Aula

## Iniciando um projeto node com yarn

Fazer diretório upload-ai-api

"yarn init -y"
- Cria o projeto node

Instalação de dependências que serão utilizadas
- yarn add typescript -D
- yarn add @types/node -D
- yarn add tsx -D
- yarn add fastify --> utilizaremos para as ROTAS do app

Criar arquivo src/server.ts
- codar

Criar script "dev" no package.json
- "dev": "tsx watch src/server.ts"

## Utilização do prisma

Prisma é um ORM (Object Relational Mapper)
- Facilita a comunicação entre banco de dados relacionais e linguagens de programação orientadas a objetos

Prisma é uma ferramenta que contém muitas funcionalidades para lidar com banco de dados
- Cria automaticamente as tabelas do BD
- Cria a tipagem das tabelas (não permite fazer inserção em uma coluna que nao existe, ou tentar atribuir um número num campo que é um texto, etc)
- Se adapta automaticamente a outros bancos de dados (MySQL, SQlite, etc)

"yarn add prisma -D"
- Para instalar o prisma

"yarn prisma init --datasource-provider sqlite"
- Para iniciar o prisma com sqlite
- sqlite é um banco baseado em arquivo

Arquivos criado ao inicializar:
- arquivo .env, que contém as VARIÁVEIS DE AMBIENTE
- arquivo prisma/schema.prisma

É necessário baixar a extensão do prisma para o VS Code

Configurações no settings.json do VS Code (CTRL + Shift + P)
```json
"[prisma]": {
    "editor.formatOnSave": true
}
```
Quando salvar arquivos do tipo prisma, a formatação é realizada automaicamente

Codar o arquivo schema.prisma
- Criar a tabela Video
- Criar a tabela Prompt

"yarn prisma migrate dev"
- Automaticamente percebe que coisas novas foram criadas
- Pede descrição do que foi criado
- Gera o arquivo .sql com todo o DDL para fazer a criação das tabelas
- Prisma automaticamente cria essas tabelas no banco de dados

"yarn prisma studio"
- Abre uma interface no navegador para visualizar o BD
- Possível adicionar/excluir resgistros por meio dessa interface

### Ideal: utilizar serviço externo para upload de arquivo

Os arquivos de vídeo que serão carregados pelo usuário não devem ficar em disco junto com o nosso projeto

O ideal seria utilizar um serviço externo para fazer upload de arquivos
- Amazon s3
- Cloudflare R2

No entanto, descartaremos essa possibilidade pq tem que pagar

## Criação das rotas para upload de video