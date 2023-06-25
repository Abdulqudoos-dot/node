
const http = require('http')
const PORT = 80
const toDo = [
    {
        id: 1,
        name: 'Abdul Qudoos',
    },
    {
        id: 2,
        name: 'Babar Ali',
    }
]


const server = http.createServer((req, res) => {
    const { method, url } = req
    let body = []
    req.on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        let status = 404
        let response = {
            success: false,
            data: null,
            error: 'please add correct credentials'

        }
        if (method === 'GET' && url === '/todo') {
            status = 200
            response.success = true
            response.data = toDo
            response.error = null

        } else if (method === 'POST' && url === '/todo') {
            const { id, name } = JSON.parse(body)
            if (!id || !name) {
                status = 404
                response.success = false
                response.data = null
                response.error = 'please eneter id or name'
            } else {

                toDo.push({ id, name })
                response.success = true
                status = 201
                response.data = toDo
                response.error = null
            }
        }

        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        })


        res.end(JSON.stringify(response))
    })

})


server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})