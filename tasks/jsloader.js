/*
 * grunt-jsloader
 * https://github.com/mikec/grunt-jsloader
 *
 * Copyright (c) 2014 Mike Calvanese
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

    var _ = grunt.util._;

    grunt.registerMultiTask(
        'jsloader',
        'Set up scripts for asynchronous loading',
        function() {
            var data = this.data;
            var main = data.main;
            var scripts = data.scripts;

            var mainFile = grunt.file.read(main);

            var m = mainFile.match(/\n([\t ]*?)\/\* jsloader \*\//g);
            var indent = m + '';
            indent = indent.replace('/* jsloader */', '');
            indent = indent.replace(/\n/g, '');

            var scriptCode = '';
            for(var bundle in scripts) {
                var src = 
                        scripts[bundle].src ||
                        (_.isString(scripts[bundle]) && scripts[bundle]);
                scriptCode +=
                    '$script("' + src + '","' + bundle + '");\n' + indent;
            }

            var code = 
                    mainFile
                    .match(/\/\* jsloader \*\/([\s\S]*?)\/\* end jsloader \*\//g);
            var newCode = code + '';
            newCode = 
                newCode.replace(
                    '/* jsloader */',
                    scriptCode +
                    '$script.ready(' + 
                    JSON.stringify(Object.keys(scripts)) + ', ' +
                    'function() {'
                );
            newCode = newCode.replace('/* end jsloader */', '});');

            mainFile = mainFile.replace(code, newCode);

            grunt.file.write(main, mainFile);
        }
    );

};