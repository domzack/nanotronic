'use strict'

/**
 * uma forma pratica e bastante funciona de obter o stream direto da camera
 * é utilizando o package 'rtsp-ffmpeg'
 * 
 * Esse pacote basicamente cria uma conexao rtsp com a camera. E sempre
 * uma foto for recebida com sucesso, ele envia para o callback. Onde podemos
 * coletar os dados em formato buffer e converte-los para o formato que 
 * melhor se ajusta ao nosso codigo
 * 
 * A baixo um exemplo práticodo serviço em node
 * 
 * Tenha em vista que cada fabricante de cameras tem o seu padrao rtsp.
 * As vezes é necessario consultar documentacao tecnica do dispositivo, 
 * ou utilizar um pacote onvif para receber as urls de cada servico.
 * 
 * Neste exemplo a uri foi formatada para cameras hikvision,
 * utilizadas pela equipe de T.I. Olfar nas automações 
 */

const rtsp = require('rtsp-ffmpeg')

const usuario = 'meu_usuario'
const senha = 'minha_senha'
const ip_camera = 'ip_camera'

const uri = `rtsp://${usuario}:${senha}@${ip_camera}:554/Streaming/Channels/101/`

let stream = new rtsp.FFMpeg({
    input: uri
    // , rate: 10                  // (optional) output framerate 
    // , resolution: '640x480'     // (optional) output resolution in WxH format
    // , quality: 3                // (optional) JPEG compression quality level
})

stream.on('start', function () { console.log('stream started') })
stream.on('stop', function () { console.log('stream stopped') })
stream.on('data', pipeStream)

/**
 *  callback que é chamada sempre que houver uma foto disponivel no buffer
 *  Os dados chegam em formato byte Array. 
 * Sendo necessario converter para o formato desejado 
 */
function pipeStream(data) {
    console.log({ data })           // imprime o snapshot
}



