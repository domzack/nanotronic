'use strict'

/**
 * Para enviar e receber stream de um dispositivo
 * conecte ao servidor websocket pela porta 8181
 * informe o ip do dispositivo no parametro "link".
 * A baixo um exemplo em nodejs: 
 */

const WebSocket = require('ws')

const servidor = '192.168.20.211'                 // informar o ip do servidor 
const porta = 8181                                // porta do serviço
const dispositivo = '10.2.2.133'                  // ip do dispositivo que deseja vincular

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

    AbreCancela: (ws) => ws.send(`ABRE`),               // AbreCancela
    FechaCancela: (ws) => ws.send(`FECHA`),             // FechaCancela
}

/** Iniciando a conexao com o servidor */
ws.on('open', function open() {
    /** Envia para o disposito comando VER que retorna VERSAO do firmware */
    comando.GetVersion(ws)
})

/** websocket events */
ws.on('message', function message(data) { console.log('Received:', data.toString()) })
ws.on('close', function close() { console.log('Disconnected from the server') })
ws.on('error', function error(err) { console.error('Error:', err) })


/** O codigo a baixo captura linhas digitadas no console 
 * e envia para o WS como um comando.
 * Experimente digital STATUS, VER, GS 
*/

var readline = require('readline');
readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true)

let command = ''
process.stdin.on('keypress', (chunk, key) => {
    if (command == 'quit' || command == 'exit') process.exit()
    if (chunk == '\r') { ws.send(command); console.log('ws.send:', command); command = '' }
    else if (chunk == '\n') command = ''
    else command += chunk
});