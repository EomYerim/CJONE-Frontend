const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://a0219d35d86ab4232acd477406a5d205-1866668016.ap-northeast-2.elb.amazonaws.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // /api/auth/signIn -> /auth/signIn
      },
      onProxyReq: function(proxyReq, req, res) {
        console.log('프록시 요청:', req.method, req.url);
      },
      onProxyRes: function(proxyRes, req, res) {
        console.log('프록시 응답:', proxyRes.statusCode);
      },
      onError: function(err, req, res) {
        console.error('프록시 에러:', err);
      }
    })
  );
}; 