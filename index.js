const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('There is a connection ')

    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('Created', data => {
        socket.broadcast.emit('Created', data)
    })

    socket.on('chat-message', data => {
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('stopTyping', data => {
        socket.broadcast.emit('stopTyping', data)
    })
    socket.on('joined', data => {
        socket.broadcast.emit('joined', data)
    })
    socket.on('leaved', name => {
        socket.broadcast.emit('leaved', name)
    })
})

http.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})