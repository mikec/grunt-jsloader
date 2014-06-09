var grunt = require('grunt');
var wrench = require('wrench');
var assert = require('assert');

grunt.task.init([]);
grunt.config.init({});

describe('test', function() {

    beforeEach(function() {
        wrench.copyDirSyncRecursive('test/fixtures', 'tmp');
    });

    afterEach(function() {
        wrench.rmdirSyncRecursive('tmp');
    });

    it('master file given as string', function() {
        
        grunt.log.muted = true;
        grunt.config.init();
        grunt.config('jsloader', 'tmp/master.js');
        grunt.task.run('jsloader');
        grunt.task.start();

        var changed = grunt.file.read('tmp/master.js');
        var expect = grunt.file.read('test/expected/master_with_script.js');
        
        assert.equal(changed, expect);

    });

});

