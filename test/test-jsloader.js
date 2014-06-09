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

    describe('given a main file, and two scripts with one dependency',
    function() {

        beforeEach(function() {
            grunt.log.muted = true;
            grunt.config.init();
            grunt.config('jsloader', { 
                test: {
                    main: 'tmp/main.js',
                    scripts: {
                        foo: 'tmp/foo.js',
                        bar: {
                            src: 'tmp/bar.js',
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
            var expect = grunt.file.read('test/expected/foo_no_deps.js');
            
            assert.equal(changed, expect);

        });

        it('should $script.ready to block execution of the file until ' +
                'dependencies are loaded',
        function() {

            var changed = grunt.file.read('tmp/bar.js');
            var expect = grunt.file.read('test/expected/bar_depends_on_foo.js');
            
            assert.equal(changed, expect);

        });

    });

    describe('given a file with multiple dependencies', function() {

        beforeEach(function() {
            grunt.log.muted = true;
            grunt.config.init();
            grunt.config('jsloader', { 
                test: {
                    main: 'tmp/main.js',
                    scripts: {
                        foo: 'tmp/foo.js',
                        bar: 'tmp/bar.js',
                        baz: {
                            src: 'tmp/baz.js',
                            dep: ['foo', 'bar']
                        }
                    }
                }
            });
            grunt.task.run('jsloader');
            grunt.task.start();
        });

        it('should add $script.ready to the file and include ' +
            'an array of dependencies',
        function() {

            var changed = grunt.file.read('tmp/baz.js');
            var expect = 
                    grunt.file.read(
                        'test/expected/baz_depends_on_foo_and_bar.js'
                    );
            
            assert.equal(expect, changed);

        });

    });

});

