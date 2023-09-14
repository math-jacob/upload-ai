# Terceira Aula - Integrando backend e frontend

## Separando front-end em componentes

Separar App.tsx em componentes e codar esses componentes
- video-input-form.tsx

### web assembling

- executar linguagens dentro do navegador
- utilizaremos para converter video em audio

### ffmpeg

https://github.com/ffmpegwasm/ffmpeg.wasm

Biblioteca famosa para edição de vídeo e audio
- É suportada com web assembling
- OBS: utilizar google chrome caso der errado

"yarn add @ffmpeg/ffmpeg @ffmpeg/util"

Criar arquivo lib/ffmpeg.ts
- Codar a configuração do ffmpeg
- Colar arquivos do material complementar do ffmpeg na pasta src