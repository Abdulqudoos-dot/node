const { error } = require('console')
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


    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    })

    // we are using res.on method
    let body = [];

    req.on('data', chunk => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        console.log(body)
    })

    res.end(
        JSON.stringify({
            success: true,
            data: toDo,
        })
    )

})


server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})