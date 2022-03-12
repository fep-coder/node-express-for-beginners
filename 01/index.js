const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/about") {
        res.end("About page");
    } else if (req.url === "/contact") {
        res.end("Contact page");
    } else if (req.url === "/") {
        res.end("Home page");
    } else {
        res.writeHead(404);
        res.end("Page not found");
    }
});

server.listen(3000, console.log("Listening on port 3000"));
