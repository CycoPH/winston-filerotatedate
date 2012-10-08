var winston = require('winston');
var rotateDate = require('../lib/fileRotateDate')
var fs = require('fs')
var path = require('path');

process.argv.shift();	// Shift out the node

var basepath = path.resolve(process.argv.shift() || '.');

var testDir = path.dirname(basepath);
var logDir = path.join(testDir, "testdir");
var logFN = path.join(logDir, basename);

console.log("Test results go into dir: "+logDir);

var basename = "test.log";

// Make sure that the log file is gone
function rimrafSync (p) {  
	try {    
		var s = fs.lstatSync(p)  
	} catch (er) {    
		if (er.code === "ENOENT") return;
		throw er  
	}  

	if (!s.isDirectory()) return fs.unlinkSync(p)  

	fs.readdirSync(p).forEach(function (f) {    
		rimrafSync(path.join(p, f))  })  

	fs.rmdirSync(p)
}


rimrafSync(logDir);

fs.mkdir(logDir);

//if (fs.existsSync(logFN))
//	fs.unlinkSync(logFN);


// Create the logger
var log = new (winston.Logger)({
	transports: [
		new (winston.transports.FileRotateDate)( {
			filename: 'test.log',
			dirname: './test/testdir',
			json: false,
			maxsize: 10,
		})
	],
});

// Write something to the log file
log.error("this is an error");

setTimeout( function () {
	log.warn("this is a warning");

	setTimeout( function () {
		var list = fs.readdirSync(logDir);

		if (list.length == 2) {
			console.log("Yup, we have two log files");
			process.exit(0);
		}
		else {
			console.log("Oh, no we should have two files, but have ", list.length)
			process.exit(1);
		}

	}, 1000);
}, 1000);


