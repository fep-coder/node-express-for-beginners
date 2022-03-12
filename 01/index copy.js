const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end("Hello Node");
});

server.listen(3000, console.log("Listening on port 3000"));
