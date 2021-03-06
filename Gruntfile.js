module.exports = function(grunt) {

    grunt.initConfig({

        mochacli: {
            all: ['test/test-*.js']
        }

    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['mochacli']);
    grunt.registerTask('test', 'default');

};