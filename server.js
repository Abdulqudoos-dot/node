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
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('X-Powered-By', 'Node.js')
    // destructring
    const { url, method, header } = req
    console.log(header)

    res.write('hello')
    res.end()
})


server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})