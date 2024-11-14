const net = require("net");

const olfar_server = '192.168.20.211'
const port = 9196
let server;

function ServerStart(state = false) {
    server = net.createServer((socket) => {
        const host = socket.remoteAddress.replace('::ffff:', '')
        console.log({ new: host })

        let client = net.createConnection(parseInt(port), olfar_server, () => { })

        client.on("data", (data) => socket.write(data))
        client.on("error", (error) => { client.close(), console.error(error) })
        client.on("close", (data) => { client.close(), console.log('close') })
        client.on("end", (data) => { client.close(), console.log('end') })

        client.setEncoding('utf8');

        socket.on('data', (data) => client.write(data))
        socket.on('end', () => { console.log({ host, msg: 'end' }) })
        socket.on('error', (error) => { console.error(error) })
    })
    server.on("error", (error) => {
        console.error(error)
        setTimeout(() => { ServerStart(false) }, 1000);
    })
    if (state) server.listen(port, () => { console.log(`listening on PORT:`, port) })
}

ServerStart(true)