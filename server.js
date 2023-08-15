const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:4523/m1/3150146-0-default', // target host
    changeOrigin: true, // needed for virtual hosted sites
  }),
);

app.use(express.static('dist')); // serve your static files

app.listen(8080, () => {
  console.log('HTTP Server running on port 8080', 'http://localhost:8080');
});
