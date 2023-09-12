# Primeira Aula - Interface

## Criando projeto frontend com Vite

Vite
- Ótima ferramenta de desenvolvimento frontend para projetos simples
- https://vitejs.dev/guide/
- "yarn create vite"

Após criar o projeto, instalar as dependencias
- "yarn install"

## Organizando e limpando a estrutura

Remover os arquivos
- README.md
- .eslintrc.csj
- src/App.css
- src/assets/
- public/vite.svg

Alterações no index.html
- alterar o titulo para "upload.ai"
- remover o icone

Alterações no App.tsx
- remover todo o conteudo de return
- colocar um hello world
- remover todas as importações
- trocar export default app para export function App()
- mudar a importação do App no main.tsx para import { App } from './App.tsx'

Remover todo o conteúdo do index.css

## Utilizando Tailwind CSS

https://tailwindcss.com

Biblioteca de utility classes
- Podemos estilizar os componentes utilizando classes

## Utilizando Radix UI 

https://www.radix-ui.com/primitives

Biblioteca que traz uma série de componentes comuns em aplicações web
- Esses componentes não tem estilização, traz apenas o funcionamento
- A estilização é responsabilidade do usuário

## Utilizando shadcn/ui

https://ui.shadcn.com/docs

Biblioteca que possui componentes utilizados prontos
- Possui vários componentes implementados utilizando Tailwind
- Os componentes seguem um estilo padrão
- shadcn/ui = tailwind + radix

Instalar o shadcn/ui já instala o Tailwind e o Radix junto!

## Quando utilizar o shadcn/ui ??

Quando queremos focar na produtividade e não na interface

Se tivermos um designer no time ou quisermos atribuir uma identidade visual para a nossa aplicação, não vale a pena utilizar o shadcn/ui