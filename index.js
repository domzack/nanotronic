'use strict'

/**
 * Para enviar e receber stream de um dispositivo
 * conecte ao servidor websocket pela porta 8181
 * informe o ip do dispositivo no parametro "link".
 * A baixo um exemplo em nodejs: 
 */

const WebSocket = require('ws')

const servidor = '127.0.0.1'                // informar o ip do servidor 
const porta = 8181                          // porta do serviço
const dispositivo = '192.168.1.240'         // ip do dispositivo que deseja vincular

/** criando uma conexao com servidor e vinculando ao dispositivo /link=[IP_DISPOSITIVO] */
let ws = new WebSocket(`ws://${servidor}:${porta}/link=${dispositivo}`)

/** Automaca de comandos */
const comando = {
    GetVersion: (ws) => ws.send('VER'),                 // comando VERSION
    GetStatus: (ws) => ws.send('GS'),                   // Get Status IOs

    SinalVerde: (ws) => ws.send('SS.GREEN'),            // Liga Verde, desliga Vermelho
    PiscaVerde: (ws) => ws.send('SSGP'),                // Pisca Verde
    DesligaVerde: (ws) => ws.send('SSGOFF'),            // Desliga Verde

    SinalVermelho: (ws) => ws.send('SS.RED'),           // Liga Vermelho, desliga Verde
    PiscaVermelho: (ws) => ws.send('SSRP'),             // Pisca Vermelho
    DesligaVermelho: (ws) => ws.send('SSROFF'),         // Desliga Vermelho

    WriteLcd: (ws, text) => ws.send(`SLW${text}`),      // Escreve no LCD
    ResetLcd: (ws) => ws.send(`SLX`),                   // Reseta LCD
    LigaLcd: (ws) => ws.send(`SLON`),                   // Liga LCD
    DesligaLcd: (ws) => ws.send(`SLOFF`),               // Desliga LCD
}

/** Iniciando a conexao com o servidor */
ws.on('open', function open() {
    /** Envia para o disposito comando VER que retorna VERSAO do firmware */
    comando.GetStatus(ws)
})

/** websocket events */
ws.on('message', function message(data) { console.log('Received:', data.toString()) })
ws.on('close', function close() { console.log('Disconnected from the server') })
ws.on('error', function error(err) { console.error('Error:', err) })

