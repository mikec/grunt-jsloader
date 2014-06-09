grunt-jsloader
==============

Set up your project for asynchronous script loading

Installation
------------

Install grunt-jsloader using npm:

```
$ npm install grunt-jsloader
```

Then add this line to your project's *Gruntfile.js*:

```javascript
grunt.loadNpmTasks('grunt-jsloader');
```

How to use it
-------------

grunt-jsloader prepares your script files to be loaded asynchronously using [script.js](https://github.com/ded/script.js/).

Configure the grunt task:

```
jsloader: {
    example: {

        // main file where $script will be used to load all other files.
        // this can be any type of file, but will usually be a .js or .html
        main: 'main.js',

        // a map of all scripts and their dependencies
        scripts: {

            // scripts without any dependencies.
            foo: 'foo.js',
            bar: 'bar.js',

            // a script with dependencies
            baz: {
                src: 'bar.js',
                dep: ['foo', 'bar']
            }
        }
    }
}
```

In your main file, include the following placeholder:
```
    /* jsloader */
        // code to run when all dependencies are loaded
        runMyApp();
    /* end jsloader */
```

You will need to add a reference to [script.js](https://github.com/ded/script.js/) to your project. Make sure that it's loaded before the spot where the `/* jsloader */` placeholder code will be included.


Testing
-------

```
$ cd grunt-jsloader
$ npm test
```