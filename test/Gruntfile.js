module.exports = function(grunt) {

    grunt.initConfig({
        jsloader: {
            test: {
                master: 'files/master.js'
            }
        }
    });

    grunt.loadTasks('../tasks');

};