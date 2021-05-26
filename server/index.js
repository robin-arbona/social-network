const httpServer = require("http").createServer();
const hostname = 'bonjour.fr';
const port = 3001;
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
        }
});

io.on('connection', ()=>{
    console.log('New connexion');
})

httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});