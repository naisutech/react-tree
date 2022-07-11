@echo off
REM This has to be in a separate batch file rather than a sequence of ... && ... commands, because the
REM "set" command only takes effect AFTER the line containing it has completed. Chaining it with &&
REM means it will NOT take effect for the commands following it in the same line.
set NODE_ENV=production
IF EXIST .\\js ( rmdir /S /Q .\\js )
REM "tsc" and "yarn" are batch files, so unless we use "call" to execute them, execution won't come back here.
call tsc -p tsconfig.build.json
call yarn copy-files-windows
REM I don't know if "rollup" is a batch file, but it doesn't matter either way.
rollup -c