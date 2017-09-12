winston-filerotatedate
======================
File transport for winston that allows the log files to be rotated depending on size and time.

### File Rotate Date Transport
``` js
  winston.add(winston.transports.FileRotateDate, options)
```

The File transport accepts a filename via the 'filename' option and uses that file as the primary logging target.
Should the file grow past 'maxsize' bytes then the current log file is renamed and a new primary log tile is created.
The name of the renamed log file is formated as such 'basenameYYYYMMDD[a-z].bak'.

# NOTE: #
Filename for the rotated file has changed to the following format from version 0.2.0
'basenameYYYYMMDD_HHmmSS_ms.bak'
YYYY = Year
MM = Month
DD = Day
HH = Hour
mm = Minute
SS = Seconds
ms = milliseconds

Available options are:

* __level:__ Level of messages that this transport should log.
* __silent:__ Boolean flag indicating whether to suppress output.
* __timestamp:__ Boolean flag indicating if we should prepend output with timestamps (default true). If function is specified, its return value will be used instead of timestamps.
* __filename:__ The filename of the logfile to write output to.
* __dirname:__ The folder the logfile will be created in.
* __maxsize:__ Max size in bytes of the logfile, if the size is exceeded then a new file is created.
* __json:__ If true, messages will be logged as JSON (default true).
* __name:__ Give the transport a specific name: Default=`fileRotateDate`

*Metadata:* Logged via util.inspect(meta);