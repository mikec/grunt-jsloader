/*
 * grunt-jsloader
 * https://github.com/mikec/grunt-jsloader
 *
 * Copyright (c) 2014 Mike Calvanese
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var _ = grunt.util._;

    grunt.registerMultiTask(
        'jsloader',
        'Set up scripts for asynchronous loading',
        function() {
            var data = this.data;
            var master = data.master || (_.isString(data) && data);
            var contents = grunt.file.read(master);
            grunt.file.write(master, 'TEST' + contents);

            var tst = grunt.file.read(master);
            grunt.log.writeln(tst)
        }
    );

};