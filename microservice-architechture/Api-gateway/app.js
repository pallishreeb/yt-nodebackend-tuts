const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')


const app = express();
//defines routes and their ports
const routes = {
    '/users':'http://localhost:3000',
    '/orders': 'http://localhost:3001',
    '/products': 'http://localhost:3002'
}

//create a proxy for each route
for(const route in routes){
    const target = routes[route];
    app.use(route,createProxyMiddleware({target}))
}

const PORT = 8000;
app.listen(PORT, () => console.log("API GATEWAY STARTED"))