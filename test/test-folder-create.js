// hwr20130619: Simple test to verify that we fail to write log to non-existent folder with creatLogFolder=false, 
//				then when we set creatLogFolder=true, we can successfully write to the same (non-existent) log folder
var winston = require('winston');
var rotateDate = require('../lib/fileRotateDate');
var fs = require('fs');
var path = require('path');

var logFile = 'test.log';
var logDir = path.join(__dirname, "testdir2");

console.log("Test results go into dir: "+ logDir);


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

//
// Test Case 1: see if we can write to no-existent log folder, with createLogFolder=false, 
//			    thus we expect exception
//
var d1 = require('domain').create();
d1.on('error', function(err){
	// We expect error, since no log folder, and createLogFolder == false
	console.log("Test1: We got error as expected, since we don't have existing log folder");
});

d1.run(function(){
	// Create the logger
	var log = new (winston.Logger)({
		transports: [
			new (winston.transports.FileRotateDate)( {
				filename: logFile,
				dirname: logDir,
				json: false,
				maxsize: 10,
				createLogFolder: false
			})
		],
	});

	// Write something to the log file
	log.error("this is an error", function() {
		console.log("Test1: Successfully create log folder and wrote to log within folder");
	});
});

//
// Test Case 2: see if we can write to no-existent log folder, with createLogFolder=true, 
//			    thus we expect log folder to be created and successful log of message
//
var d2 = require('domain').create();
d2.on('error', function(err){
	// We expect error, since no log folder, and createLogFolder == false
	console.log("Test2: We got unexpected error: %s", err);
});

d2.run(function(){
	// Create the logger
	var log = new (winston.Logger)({
		transports: [
			new (winston.transports.FileRotateDate)( {
				filename: logFile,
				dirname: logDir,
				json: false,
				maxsize: 10,
				createLogFolder: true
			})
		],
	});

	// Write something to the log file
	log.error("this is an error", function() {
		console.log("Test2: Successfully create log folder and wrote to log within folder");
	});
});
