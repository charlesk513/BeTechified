//raw javascript
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method == 'GET' && req.url === '/') {
        req.writeHead(200, { 'Content-type': 'text/plain' });
        res.end('Hello from raw node js, backend!');
    } else {
        req.writeHead(404, { 'Content-type': 'text/plain' });
        res.end('Not Found!');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Raw server running on http://localhost:$(PORT)");
});