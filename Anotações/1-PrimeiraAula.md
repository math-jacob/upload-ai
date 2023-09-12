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