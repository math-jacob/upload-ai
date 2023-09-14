# Terceira Aula - Integrando backend e frontend

## Separando front-end em componentes

### Component: video-input-form

Separar App.tsx em componentes e codar esses componentes
- video-input-form.tsx

#### web assembling

- executar linguagens dentro do navegador
- utilizaremos para converter video em audio

#### ffmpeg

https://github.com/ffmpegwasm/ffmpeg.wasm

Biblioteca famosa para edição de vídeo e audio
- É suportada com web assembling
- OBS: utilizar google chrome caso der errado

"yarn add @ffmpeg/ffmpeg @ffmpeg/util"

Criar arquivo lib/ffmpeg.ts
- Codar a configuração do ffmpeg
- Colar arquivos do material complementar do ffmpeg na pasta src

#### Intergrar frontend com backend para fazer uploadVideo

"yarn add axios"

Biblioteca para fazer chamadas HTTP do frontend para o backend

Criar arquivo lib/axios.ts
- Fazer a configuração para acessar o backend

### Component: prompt-select

Separar App.tsx em componentes e codar esses componentes
- prompt-select.tsx

### Adicionar pacote no backend: ai

"yarn add ai"
- Pacote que ajuda a retornar a resposta da IA aos poucos

### seed.ts

Criar arquivo prisma/seed.ts
- Colar o conteúdo do material complementar neste arquivo
- Arquivo que cria dois prompts automaticamente

No arquivo package.json, adicionar a configuração
```json
"primsa": {
    "seed": "tsx prisma/seed.ts"
}
```

Rodar o comando
- "yarn prisma db seed"