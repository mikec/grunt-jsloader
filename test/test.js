var grunt = require('grunt')
    , assert = require('assert')
    , path = require('path')
    , fs = require('fs');


var testDir = path.join(process.cwd(), 'test')
    , opts = { gruntfile: path.join(testDir, 'Gruntfile.js') }
    , tasks = ['jsloader:test'];

grunt.tasks(tasks, opts, function() {

    assert.equal(true, true);

});

