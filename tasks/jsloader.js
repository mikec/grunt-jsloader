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

            var masterCode = '';
            for(var bundle in scripts) {
                var s = scripts[bundle];
                var src = 
                        s.src ||
                        (_.isString(s) && s);
                masterCode +=
                    '$script("' + src + '","' + bundle + '");\n' + indent;

                if(s.src && s.dep) {
                    addReadyScriptToFile(s.src, s.dep);
                }
            }

            var code = 
                    mainFile
                    .match(/\/\* jsloader \*\/([\s\S]*?)\/\* end jsloader \*\//g);
            var newCode = code + '';
            newCode = 
                newCode.replace(
                    '/* jsloader */',
                    masterCode +
                    '$script.ready(' + 
                    JSON.stringify(Object.keys(scripts)) + ', ' +
                    'function() {'
                );
            newCode = newCode.replace('/* end jsloader */', '});');
            mainFile = mainFile.replace(code, newCode);
            grunt.file.write(main, mainFile);
        }
    );

    function addReadyScriptToFile(fileName, dependencies) {
        var f = grunt.file.read(fileName);

        var depString = 
                _.isString(dependencies) ? 
                    "'" + dependencies + "'" : 
                    dependencies.length == 1 ? 
                        "'" + dependencies[0] + "'" : 
                        JSON.stringify(dependencies);
        var code = 
            '$script.ready(' + depString + ', function() {\n' +
                f + 
            '\n});';
        grunt.file.write(fileName, code);
    }

};