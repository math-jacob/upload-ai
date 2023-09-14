import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFMpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export function VideoInputForm() {

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null) // referenciando uma Textarea

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    // Pega o arquivo que o usuario selecionou
    const { files } = event.currentTarget

    // Se o usuario nao selecionou um arquivo, retornar
    if (!files) {
      return
    }

    // event.currentTarget retorna um array
    // Como o usuario só pode selecionar um arquivo, vamos pegar somente files[0]
    const selectedFile = files[0]

    // Armazenando o video em um estado
    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert started.')

    const ffmpeg = await getFFMpeg()

    // Colocar um arquivo dentro do contexto do ffmpeg
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // Evento de erros/bugs. Usar somente caso der algo errado
    // ffmpeg.on('log', log => {
    //   console.log('log')
    // })

    ffmpeg.on('progress', progress => {
      console.log('Convert Progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '28k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    // Ler o arquivo output.mp3
    const data = await ffmpeg.readFile('output.mp3')

    // Converter FileData do ffmpeg para File do javascript
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Convert finished.')

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {

    // Evitar o recarregamento da pagina após submit de formulario
    event.preventDefault()

    // Acessando o prompt que o usuario informou (Textarea)
    const prompt = promptInputRef.current?.value

    // Se o submit foi feito e nenhum video tiver sido selecionado, retornar
    // Necessário o usuario ter feito um video para fazer submit no form
    if (!videoFile) {
      return
    }

    // Converter o vídeo em audio será realizada pelo navegador do usuario
    const audioFile = await convertVideoToAudio(videoFile)

    console.log(audioFile, prompt)
  }

  // gerar previsualização do video quando o usuario carrega-lo
  // Por padrão, o React recarrega a página se algum estado for alterado, tudo o que está no componente é recalculado e renderizado novamente
  // useMemo() é utilizado para recarregar previewURL SOMENTE SE videoFIle mudar
  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile) // cria URL de pré-visualização de um arquivo

  }, [videoFile])

  return (
    <form className='space-y-6' onSubmit={handleUploadVideo}>
      <label 
        htmlFor="video"
        className='relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
      >
        {previewURL ? (
          <video src={previewURL} controls={false} className="pointer-events-none inset-0"/>
        ) : (
          <>
          <FileVideo className='w-4 h-4'/>
          Selecione um vídeo
          </>
        )}
      </label>

      <input type="file" id='video' accept='video/mp4' className='sr-only' onChange={handleFileSelected}/>

      <Separator />

      <div className='space-y-2'>
        <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
        <Textarea 
          ref={promptInputRef}
          id='transcription_prompt' 
          className='h-20 leading-relaxed resize-none'
          placeholder='Inclua palavras-chave mencionadas no vídeo separadas por virgula (,)'
        />
      </div>

      <Button type='submit' className='w-full'>
        Carregar Vídeo
        <Upload className='w-4 h-4 ml-2'/>
      </Button>
    </form>
  )
}