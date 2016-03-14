const http=require('http');
http.createServer((request,response)=>{

	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('hello world\n');


}).listen(5050);

cosole.log('server running at http://127.0.0.1');