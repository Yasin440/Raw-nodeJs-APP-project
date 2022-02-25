/* 
* Title: Uptime Monitoring Application
* Description; A RESTFUl API to monitor up or down time of user defined links
* Author: Md Yasin Miah.
* Date: 25 FEB 2022
*/

//dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

//app object - module scaffolding
const app = {};

//configuration
app.config = {
    port: 4000,
};

//create server
app.createServer = () => {
    const server = http.createServer(app.handleResponse);
    server.listen(app.config.port, () => {
        console.log(`Raw node app listening port ${app.config.port}`);
    })
}

//handle request and response
app.handleResponse = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryObject = parsedUrl.query;
    const headerObject = req.header;

    const decoder = new StringDecoder('utf-8');
    let myData = '';

    req.on('data', (buffer) => {
        myData += decoder.write(buffer);
    })
    req.on('end', () => {
        myData += decoder.end();
        console.log(myData);
        res.end('Hello Md Yasin.');

    })


}

//start the server
app.createServer();