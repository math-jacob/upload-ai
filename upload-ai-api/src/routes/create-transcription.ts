import { FastifyInstance } from "fastify";
import { createReadStream } from 'node:fs'
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { openai } from '../lib/openai';

export async function createTranscriptionRoute(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', async (request) => {

        // Definir o objeto que vc espera encontrar na requisição
        const paramsSchema = z.object({
            videoId: z.string().uuid(), // videoId é uma String no formato uuid
        })

        // parse() vai validar se req.params segue o formato definido em paramsSchema
        // caso SIM, retorna o objeto definido em paramsSchema
        const { videoId } = paramsSchema.parse(request.params)

        // Pegar o prompt
        const bodySchema = z.object({
            prompt: z.string(),
        })

        const { prompt } = bodySchema.parse(request.body)
        
        // Recuperar o video (registro no BD ) a partir do videoId
        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            }
        })

        // Encontrar o caminho onde esse video foi salvo
        const videoPath = video.path

        // Ler o video (arquivo que está salvo no diretório tmp)
        const audioReadStream = createReadStream(videoPath)

        // Enviar para a API que faz a transcrição
        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt,
        })
        
        const transcription = response.text

        // Salvar a transcrição no banco de dados
        await prisma.video.update({
            where: {
                id: videoId,
            },
            data: {
                transcription,
            },
        })

        return { transcription }
    })
}