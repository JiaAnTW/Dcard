const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware');
const port = 8081;

app.listen(port);
app.use(express.static(path.resolve(__dirname, './build')));

app.get('/', function (req, res) {
    const html = fs.readFileSync(
        path.resolve(__dirname, './build/index.html'),
        'utf-8'
    );
    res.send(html);
});

app.use(
    '/dcard/*',
    createProxyMiddleware({
        target: 'https://www.dcard.tw',
        changeOrigin: true,
        pathRewrite: {
            [`^/dcard`]: '',
        },
    })
);

console.log(`Dcard run on http://localhost:${port}/`);
