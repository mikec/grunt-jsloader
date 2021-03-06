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
            var scripts = data.scripts;
            var opts = data.options;
            var basePath = opts ? opts.basePath : null;
            var main = basePath ? basePath + '\/' + data.main : data.main;

            var mainFile = grunt.file.read(main);

            var m = mainFile.match(/\n([\t ]*?)\/\* jsloader \*\//g);
            var indent = '';
            if(m) {
                indent = m + '';
                indent = indent.replace('/* jsloader */', '');
                indent = indent.replace(/\n/g, '');
            }

            var masterCode = '';
            for(var bundle in scripts) {
                var s = scripts[bundle];
                var src = 
                        (_.isArray(s.src) && s.src) ||
                        (_.isString(s.src) && [s.src]) ||
                        (_.isString(s) && [s]);

                masterCode +=
                    '$script(' + 
                    getDependencyString(src) + 
                    ',"' + bundle + '");\n' + indent;

                if(s.dep) {
                    var dep = s.dep == '*' ? 
                                getAllDepBundles(bundle, scripts) : 
                                s.dep;
                    for(var i in src) {
                        var fileName = 
                                basePath ? 
                                    basePath + '\/' + src[i] : src[i];
                        addReadyScriptToFile(fileName, dep);
                    }
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
        var code = 
            '$script.ready(' + 
                getDependencyString(dependencies) + 
            ', function() {\n' +
                f + 
            '\n});';
        grunt.file.write(fileName, code);
    }

    function getDependencyString(dependencies) {
        return _.isString(dependencies) ? 
                    '"' + dependencies + '"' : 
                    dependencies.length == 1 ? 
                        '"' + dependencies[0] + '"' : 
                        JSON.stringify(dependencies);
    }

    function getAllDepBundles(currentBundle, allBundles) {
        var depList = [];
        for(var bundle in allBundles) {
            if(bundle != currentBundle) {
                depList.push(bundle);
            }
        }
        return depList;
    }

};