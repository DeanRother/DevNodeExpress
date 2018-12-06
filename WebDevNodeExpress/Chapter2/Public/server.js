var http = require('http'),
	fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode){
	if (!responseCode) responseCode = 200;
	console.log('Reading: ' + __dirname + path);
	fs.readFile(__dirname + path, function(err,data){
		if (err) {
			res.writeHead(500,{'Content-Type':'text/plain'});
			res.end('500-Internal Error');
		} else {
			res.writeHead(responseCode, {'Content-Type':contentType});
			res.end(data);
		}
	});
}

http.createServer(function(req,res){
	//normalize url by remove querystring, optional
	//trailing slash, and making it lower case
	console.log(__dirname + ' : ' + req.url);
	var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
	console.log(path);
	switch(path){
		case'':
			serveStaticFile(res, '/home.html','text/html');
			break;
		case '/about.html':
			serveStaticFile(res, '/about.html','text/html');
			break;
		case '/img/bush_funeral_77.jpg':
			serveStaticFile(res, '/img/BUSH_FUNERAL_77.jpg','image/jpeg');
			break;
		default:
			serveStaticFile(res, '/404.html','text/html');
			break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-c to terminate...');

