var grunt = require('grunt');
var wrench = require('wrench');
var assert = require('assert');

grunt.task.init([]);
grunt.config.init({});

describe('jsloader', function() {

    beforeEach(function() {
        wrench.copyDirSyncRecursive('test/fixtures', 'tmp');
    });

    afterEach(function() {
        wrench.rmdirSyncRecursive('tmp');
    });

    describe('given a master file with two scripts and one dependency',
    function() {

        beforeEach(function() {
            //grunt.log.muted = true;
            grunt.config.init();
            grunt.config('jsloader', { 
                test: {
                    master: 'tmp/master.js',
                    scripts: {
                        foo: 'foo.js',
                        fooPlugin: {
                            src: 'depends_on_foo.js',
                            dep: 'foo'
                        }
                    }
                }
            });
            grunt.task.run('jsloader');
            grunt.task.start();
        });

        it('should add $script loading code to master file', function() {

            var changed = grunt.file.read('tmp/master.js');
            var expect = grunt.file.read('test/expected/master_with_script.js');
            
            assert.equal(changed, expect);

        });

    });

});

