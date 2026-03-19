const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4173;
const baseDir = __dirname;
const vendasPath = path.join(__dirname, '..', '..', 'teste', 'produtos.json');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const send = (res, statusCode, body, contentType = 'text/plain; charset=utf-8') => {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(body);
};

const serveFile = (res, filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, 'Arquivo nao encontrado.');
      return;
    }

    const ext = path.extname(filePath);
    send(res, 200, data, mimeTypes[ext] || 'application/octet-stream');
  });
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/api/vendas') {
    fs.readFile(vendasPath, 'utf-8', (err, data) => {
      if (err) {
        send(res, 500, JSON.stringify({ erro: 'Falha ao carregar vendas.' }), mimeTypes['.json']);
        return;
      }

      send(res, 200, data, mimeTypes['.json']);
    });
    return;
  }

  const normalizedPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const safePath = path.normalize(normalizedPath).replace(/^\.\.(\/|\\|$)/, '');
  const finalPath = path.join(baseDir, safePath);

  if (!finalPath.startsWith(baseDir)) {
    send(res, 403, 'Acesso negado.');
    return;
  }

  serveFile(res, finalPath);
});

server.listen(PORT, () => {
  console.log(`Dashboard rodando em http://localhost:${PORT}`);
});
