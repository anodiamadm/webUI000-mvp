const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/auth/signup/student',
    createProxyMiddleware({
      target: 'http://34.121.14.128:80',
      secure: false,
      changeOrigin: true
    })
  );
};