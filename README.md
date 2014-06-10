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

More Configuration
------------------

Scripts can be configured using a string for a single script, or an array for multiple scripts.

```
scripts: {
    foo: 'foo.js'
}

// or

scripts: {
    stuff: ['foo.js', 'bar.js']
}
```

`*` can be used in the `dep` property to include all other script groups as dependencies of this script group

```
scripts: {
    foo: 'foo.js',
    bar: 'bar.js',

    // baz depends on foo and bar
    baz: {
        src: 'baz.js',
        dep: '*'
    }
}
```

Options
-------

`basePath`

Sets the base path of you project. If used, all script src paths should be relative to the basePath.

```
// the grunt task will look for files in app, such as "app/foo.js"

// main.js, foo.js, and bar.js should be in the base path
// so relative script references will be used ("foo.js" and "bar.js")

jsloader: {
    example: {
        options: {
            basePath: 'app'
        }
        main: 'main.js',
        scripts: {
            foo: 'foo.js',
            bar: 'bar.js'
        }
    }
}
```

Testing
-------

```
$ cd grunt-jsloader
$ npm test
```