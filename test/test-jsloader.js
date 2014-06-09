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

    describe('given a main file with two scripts and one dependency',
    function() {

        beforeEach(function() {
            grunt.log.muted = true;
            grunt.config.init();
            grunt.config('jsloader', { 
                test: {
                    main: 'tmp/main.js',
                    scripts: {
                        foo: 'tmp/foo.js',
                        fooPlugin: {
                            src: 'tmp/depends_on_foo.js',
                            dep: 'foo'
                        }
                    }
                }
            });
            grunt.task.run('jsloader');
            grunt.task.start();
        });

        it('should add $script loading code to main file', function() {

            var changed = grunt.file.read('tmp/main.js');
            var expect = grunt.file.read('test/expected/main_with_script.js');
            
            assert.equal(changed, expect);

        });

        it('should not add $script.ready to files without dependencies',
        function() {

            var changed = grunt.file.read('tmp/foo.js');
            var expect = grunt.file.read('test/expected/foo_after.js');
            
            assert.equal(changed, expect);

        });

        it('should $script.ready to block execution of the file until ' +
                'dependencies are loaded',
        function() {

            var changed = grunt.file.read('tmp/depends_on_foo.js');
            var expect = grunt.file.read('test/expected/depends_on_foo_after.js');
            
            assert.equal(changed, expect);

        });

    });

});

