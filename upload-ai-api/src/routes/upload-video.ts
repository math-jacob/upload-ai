import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from "node:util";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 25, //25mb
        }
    })

    app.post('/videos', async (request, reply) => {
        // Pega o arquivo
        const data = await request.file()

        // Retorna erro caso não foi enviado um arquivo
        if (!data) {
            return reply.status(400).send({error: 'Missing file input.'})
        }

        // Pega a extensão do arquivo
        const extension = path.extname(data.filename)
        
        // Retorna erro caso a extensão não seja MP3
        if (extension != '.mp3') {
            return reply.status(400).send({error: 'Invalid input type, please upload a MP3.'})
        }

        // Evitar arquivos com o mesmo nome
        const fileBaseName = path.basename(data.filename, extension) // pega o nome do arquivo sem a extensão
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}` // gera um novo nome usando um ID aleatorio
        
        // Determinar em qual pasta o arquivo será salvo
        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        // Salvando o arquivo no Destination
        await pump(data.file, fs.createWriteStream(uploadDestination))

        // Cadastrando o video no banco de dados
        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: uploadDestination,
            }
        })

        return {
            video,
        }
    })
}