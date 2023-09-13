import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

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
        const bodytSchema = z.object({
            prompt: z.string(),
        })

        const { prompt } = bodytSchema.parse(request.body)

        return {
            videoId,
            prompt,
        }
    })
}