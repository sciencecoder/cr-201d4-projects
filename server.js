/*eslint-env node*/


/*
*
*
* NOTE: this server runs all projects change var HTML_PATH below t select path to curent project's HTML
*
*
*/

// Load the http module to create an http server.
var http = require('http');
var fs = require("fs");
const HTML_PATH = "./busmall/production/index.html"
fs.readFile(HTML_PATH, function (err, html) {
    if (err) {
        throw err; 
    }  
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
  
}).listen(9000);
});
// Listen on port 9000, IP defaults to 127.0.0.1

