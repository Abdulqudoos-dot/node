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
    // seting status code for different methods

    // we are making a response object to explain the status

    // if the status is 4.xx then there is cliet side error and data will be null
    const response = {
        success: false,
        data: null,
        error: 'please add valid data'
    }
    // for showing text  on browser
    // res.setHeader('Content-Type', 'text/plain')   

    // for showing html on browser
    // res.setHeader('Content-Type', 'text/html')
    // res.setHeader('X-Powered-By', 'Node.js')

    // for showing json on browser
    // res.setHeader('Content-Type', 'application/json')
    // res.setHeader('X-Powered-By', 'Node.js')

    // we using res.writeHead to set header and status 

    res.writeHead(404, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    })

    // res.setHeader(200, {
    //     'X-Powered-By': 'Node.js',
    //     'Content-Type': 'text/html'
    // })

    // destructring
    // const { url, method, header } = req
    // res.write('<h1>hello</h1>')
    // sending data in res.end() method instead of res.write

    // when we not using response object
    //     res.end(
    //         JSON.stringify({
    //             success: true,
    //             data: toDo
    //         })
    //     )

    // when we using response object
    res.end(
        JSON.stringify(response)
    )
})


server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})