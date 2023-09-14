import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { streamToResponse, OpenAIStream } from 'ai'
import { prisma } from "../lib/prisma";
import { openai } from '../lib/openai';

export async function generateAICompletionRoute(app: FastifyInstance) {
    app.post('/ai/complete', async (request, reply) => {

        // Pegar o zod schema
        const bodySchema = z.object({
            videoId: z.string().uuid(),
            prompt: z.string(),
            temperature: z.number().min(0).max(1).default(0.5),
        })

        // Validar e desestruturar o body em variaveis
        const { videoId, prompt, temperature } = bodySchema.parse(request.body)

        // Buscar o video de dentro do BD
        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            }
        })

        // Se o video nao tem transcrição, retornar erro
        if (!video.transcription) {
            return reply.status(400).send({error: 'Video transcription was not generated yet.'})
        }

        // Substituir o {transcription} que vem no template do body pela transcrição do video
        const promptMessage = prompt.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [
                {role: 'user', content: promptMessage}
            ],
            stream: true,
        })

        const stream = OpenAIStream(response)

        streamToResponse(stream, reply.raw, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            }
        })
    })
}