import { FFmpeg } from '@ffmpeg/ffmpeg'

import coreURL from '../ffmpeg/ffmpeg-core.js?url' // '?url' importa o arquivo assincronamente, ou seja, somente quando precisarmos
import wasmURL from '../ffmpeg/ffmpeg-core.wasm?url'
import workerURL from '../ffmpeg/ffmpeg-worker.js?url'

let ffmpeg: FFmpeg | null

export async function getFFMpeg() {
    if (ffmpeg) {
        return ffmpeg
    }

    ffmpeg = new FFmpeg()

    if (!ffmpeg.loaded) {
        await ffmpeg.load({
            coreURL,
            wasmURL,
            workerURL,
        })
    }

    return ffmpeg
}