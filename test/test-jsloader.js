var grunt = require('grunt');
var ncp = require('ncp');
var assert = require('assert');

ncp('fixtures', 'test_files');

describe('test', function() {

    it('test', function() {
        assert.equal(true, true);
    });

});

