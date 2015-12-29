var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Launch an external shell command', function() {

    describe('Importing (requiring) child_process', function() {
        var child_process = require('child_process');

        it('should create a child process', function() {
            assert.isNotNull(child_process);
        });

        describe('Call exec on child process', function() {
            it('should execute an external command', function(done) {
                child_process.exec('cat *.js | wc -l', function(err, stdout, stderr) {
                    if (err) {
                        console.log('child process exited with error code', err.code);
                        assert.fail();
                        return;
                    }

                    assert.isNull(err);
                    assert.isNotNull(stdout);
                    done();
                });
            });

            it('Can accept option when exec is called', function() {
                var options = {
                    timeout: 1000,
                    killSignal: 'SIGKILL',
                    encoding: 'ascii'
                };

                child_process.exec('cat *.js | wc -l', options, function(err, stdout, stderr) {
                    if (err) {
                        console.log('Child process exited with errors', err.code);
                        return;
                    }

                    assert.isNotNull(stdout);
                    assert.isNull(err);
                })
            });
        });

        describe('Execute child process with augmented vairables', function() {

            it('should have the augmented variables available to the child process', function() {
                var env = process.env,
                    varName, envCopy = {},
                    exec = require('child_process').exec;

                for (varName in env) {
                    envCopy[varName] = env[varName];
                }

                envCopy['CUSTOM ENV VAR'] = 'some value';
                envCopy['CUSTOM ENV VAR 2'] = 'some other value';

                exec('ls -la', {
                    env: envCopy
                }, function(err, stdout, stderr) {
                    if (err) throw err;
                    // console.log('stdout', stdout);
                    // console.log('stderr', stderr);

                });
            });
        });

        describe('Spawning a child process', function() {
            var spawn = require('child_process').spawn;

            it('should create a spawn child process', function() {
                assert.isNotNull(spawn);
            });

            it('can accept a command and execute', function() {
                var child = spawn('tail', ['-f', '/var/log/system.log']);
            })

            it('can listen to data from the child process', function(done) {
                var child = spawn('tail', ['-f', '/my_file.txt']);
                child.on('data', function(data) {
                    console.log('tail output: ' + data);
                    done();
                });

                child.on('error', function(error) {
                    console.log(error);
                    done();
                })
                done();
            });
            
            it('can be sent data from the parent process',function(){
                
            })
        });
    });
});