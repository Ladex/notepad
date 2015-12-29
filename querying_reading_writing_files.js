var path = require('path');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('path.normalize', function() {
    it('should normalize path', function() {
        assert.equal(path.normalize('/foo/bar//baz/asdf/quux'), '/foo/bar/baz/asdf/quux');
        assert.equal(path.normalize('/foo/bar/baz/asdf/quxx/../'), '/foo/bar/baz/asdf/');
    });
});


describe('path.join', function() {
    it('should join paths', function() {
        assert.equal(path.join('/foo', 'bar', 'baz/asdf', 'quxx', '..'), '/foo/bar/baz/asdf');
    });
});

describe('path.resolve', function() {
    it('should resolve paths', function() {
        assert.equal(path.resolve('/foo/bar', './baz'), '/foo/bar/baz');
        assert.equal(path.resolve('/foo/bar', '/tmp/file'), '/tmp/file');
        assert.equal(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'), '/home/ubuntu/workspace/wwwroot/static_files/gif/image.gif');
        assert.equal(path.resolve('somefolder'), '/home/ubuntu/workspace/somefolder');
    });
});

describe('path.sep', function() {
    it('should seperated the folder names from the path', function() {
        var splitPathArray = 'foo/bar/mee'.split(path.sep);
        assert.deepEqual(splitPathArray, ['foo', 'bar', 'mee']);
    });
});

describe('path.relative', function() {
    it('should find the relative path between 2 absolute paths', function() {
        var relativePath = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
        assert.equal('../../impl/bbb', relativePath);
    });
});


describe('Extracting components of a path', function() {
    describe('path.dirname', function() {
        it('should retrieve the directory of the file path', function() {
            assert.equal(path.dirname('/foo/bar/baz/asdf/quux.txt'), '/foo/bar/baz/asdf');
        });
    });

    describe('path.basename', function() {
        it('should retrieve the filename from the path', function() {
            var filename = path.basename('/foo/bar/baz/asdf/quux.html');
            assert.equal(filename, 'quux.html');
        });

        it('should remove the file extension with an optional parameter', function() {
            var filename = path.basename('/foo/bar/baz/asdf/quux.html', '.html');
            assert.equal(filename, 'quux');
        });
    });


    describe('path.extname', function() {
        it('should determine the extension when it exists', function() {
            var extname = path.extname('/a/b/index.html');
            assert.equal(extname, '.html');
        });

        it('should return an empty string when extension does not exist', function() {
            var extname = path.extname('/a/b/index');
            assert.equal(extname, '');
        });

        it('should return the . when the file ends with a .', function() {
            var extname = path.extname('/a/b/index.');
            assert.equal(extname, '.');
        });
    });
});


var fs = require("fs");
describe('fs module', function() {

    describe('Querying file statistics', function() {
        it('should return statistics', function(done) {
            fs.stat('/etc/passwd', function(err, stats) {
                if (err) {
                    throw err;
                }

                assert.isNotNull(stats, 'stats is not null');
                assert.equal(stats.isFile(), true);
                done();
            });
        })
    });


    describe('Opening a file', function(done) {
        context('This is a context', function() {
            it('should open a file', function(done) {
                fs.open('eventEmitters.js', 'r', function(err, fd) {
                    if (err) throw err
                    assert.isNotNull(fd, 'fd is  null');
                    done();
                })
            })
        })

    });


    describe('readin from a file', function(done) {
        it('should read from a file', function(done) {

            fs.open('./anjola.jpg', 'r', function opened(err, fd) {
                if (err) {
                    throw err;
                }
                var readBuffer = new Buffer(1024),
                    bufferOffset = 0,
                    bufferLength = readBuffer.length,
                    filePostion = 100;

                fs.read(fd, readBuffer, bufferOffset, bufferLength, filePostion, function read(err, readBytes) {
                    if (err) {
                        throw err
                    }
                    assert.isNotNull(readBytes);
                    assert.typeOf(readBytes, 'Number');
                    done();
                });
            });

        });
    })

    describe('Writing to a file', function(done) {
        it('should write to a file', function(done) {

            fs.open('./my_file.txt', 'w+', function opened(err, fileDescriptor) {
                if (err) {
                    throw err;
                }
                var writeBuffer = new Buffer('writing this string'),
                    bufferPosition = 0,
                    bufferLength = writeBuffer.length,
                    filePosition = null;
                fs.write(fileDescriptor,
                    writeBuffer,
                    bufferPosition,
                    bufferLength,
                    filePosition,
                    function wrote(err, written) {
                        if (err) {
                            throw err;
                        }
                        assert.isNotNull(written);
                        assert.typeOf(written, 'Number');
                        done();
                    });
            });

        })
    })

    describe('Closing a file', function(done) {
        it('should close a file', function(done) {
            openAndWriteToSystemLog(new Buffer('writing this string'), function(err) {
                if (err) {
                    console.log("error while opening and writing:", err.message);
                    return;
                }
                console.log('All done with no errors');
                done();
            });
        })
    });

    function openAndWriteToSystemLog(writeBuffer, callback) {
        fs.open('./my_file', 'w+', function opened(err, fileDescriptor) {
            if (err) {
                return callback(err)
            };

            function notifyError(err) {
                fs.close(fileDescriptor, function() {
                    callback(err);
                });
            }

            var bufferOffset = 0,
                bufferLength = writeBuffer.length,
                filePosition = null;
            fs.write(fileDescriptor, writeBuffer, bufferOffset, bufferLength, filePosition, function wrote(err, written) {
                if (err) {
                    return notifyError(err);
                }
                fs.close(fileDescriptor, function() {
                    callback(err);
                });
            })
        })
    }

})